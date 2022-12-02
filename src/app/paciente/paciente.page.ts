import { Component, OnInit, ViewChild } from '@angular/core';
import { AlertController, IonRefresher, ToastController } from '@ionic/angular';
import { Paciente } from '../interfaces/paciente.interface';
import { PacienteService } from '../servicios/paciente.service';
import { FormularioPacienteComponent } from './formulario-paciente/formulario-paciente.component';

@Component({
  selector: 'app-paciente',
  templateUrl: './paciente.page.html',
  styleUrls: ['./paciente.page.scss'],
})
export class PacientePage implements OnInit {
  @ViewChild(IonRefresher) refresher: IonRefresher;
  @ViewChild(FormularioPacienteComponent) formularioPaciente!: FormularioPacienteComponent;

  public listaPaciente: Paciente[] = [];
  public cargandoPaciente: boolean = false;
  public modalVisible: boolean = false;
  private pacienteSeleccionado: Paciente | null = null;

  public modoFormulario: 'Registrar' | 'Editar' | 'Registrar';

  libro: any;
  constructor(
    private servicioPaciente: PacienteService,
    private servicioToast: ToastController,
    private servicioAlert: AlertController
  ) { }

  ngOnInit() {
    this.cargarPaciente();
  }
  public cargarPaciente() {
    this.refresher?.complete();
    this.cargandoPaciente = true;
    this.servicioPaciente.get().subscribe({
      next: (paciente) => {
        this.listaPaciente = paciente;
        this.cargandoPaciente = false;
      },
      error: (e) => {
        console.error("Error al consultar paciente", e);
        this.cargandoPaciente = false;
        this.servicioToast.create({
          header: 'Error al cargar paciente',
          message: e.message,
          duration: 3000,
          position: 'bottom',
          color: 'danger'
        }).then(toast => toast.present());
      }
    });
  }
  public nuevo() {
    this.modoFormulario = "Registrar";
    this.pacienteSeleccionado = null;
    this.modalVisible = true;
  }
  public editar(paciente: Paciente) {
    this.pacienteSeleccionado = paciente;
    this.modoFormulario = 'Editar';
    this.modalVisible = true;

  }
  public cargarDatosEditar() {
    if (this.modoFormulario === 'Editar') {
      this.formularioPaciente.modo = this.modoFormulario;
      this.formularioPaciente.form.controls.ciCtrl.setValue(this.pacienteSeleccionado.ci);
      this.formularioPaciente.form.controls.nombreCtrl.setValue(this.pacienteSeleccionado.nombre);
      this.formularioPaciente.form.controls.apellidoCtrl.setValue(this.pacienteSeleccionado.apellido);
      this.formularioPaciente.form.controls.telefonoCtrl.setValue(this.pacienteSeleccionado.telefono);
      this.formularioPaciente.form.controls.direccionCtrl.setValue(this.pacienteSeleccionado.direccion)

    }
  }
  public ConfirmarEliminacion(paciente: Paciente) {
    this.servicioAlert.create({
      header: 'confirmar eliminacion',
      subHeader: '¿Realmente desea eliminar el paciente?',
      message: `${paciente.ci}-${paciente.nombre}(${paciente.apellido})(${paciente.telefono})(${paciente.direccion})`,
      buttons: [{
        text: 'Canselar',

      }, {
        text: 'Eliminar',
        handler: () => this.eliminar(paciente)
        
      }
      ]
    }).then(a => a.present());
  }
  private eliminar(paciente: Paciente) {
    this.servicioPaciente.delete(paciente).subscribe({
      next: () => {
        this.cargarPaciente();
        this.servicioToast.create({
          header: 'Exito',
          message: 'El paciente se elimino correctamente',
          duration: 2000,
          position: 'bottom',
          color: 'success'
        }).then(t => t.present());
      },
      error: (e) => {
        console.error('Error al eliminar paciente', e);
        this.servicioToast.create({
          header: 'Error al eliminar',
          duration: 3000,
          position: 'bottom',
          color: 'danger'
        }).then(toast => toast.present());
      }
    });
  }
}
