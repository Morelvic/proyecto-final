import { Component, OnInit, ViewChild } from '@angular/core';
import { AlertController, IonRefresher, ToastController } from '@ionic/angular';
import { Agendamiento } from '../interfaces/agendamiento.interface';
import { AgendamientoService } from '../servicios/agendamiento.service';
import { FormularioAgendamientoComponent } from './formulario-agendamiento/formulario-agendamiento.component';

@Component({
  selector: 'app-agendamiento',
  templateUrl: './agendamiento.page.html',
  styleUrls: ['./agendamiento.page.scss'],
})
export class AgendamientoPage implements OnInit {
  @ViewChild(IonRefresher) refresher: IonRefresher;
  @ViewChild(FormularioAgendamientoComponent) formularioAgendamiento!: FormularioAgendamientoComponent;

  public listaAgendamiento: Agendamiento[] = [];
  public cargandoAgendamiento: boolean = false;
  public modalVisible: boolean = false;
  private agendamientoSeleccionado: Agendamiento | null = null;

  public modoFormulario: 'Registrar' | 'Editar' | 'Registrar';

  libro: any;
  constructor(
    private servicioAgendamiento: AgendamientoService,
    private servicioToast: ToastController,
    private servicioAlert: AlertController
  ) { }

  ngOnInit() {
    this.cargarAgendamiento();
  }
  public cargarAgendamiento() {
    this.refresher?.complete();
    this.cargandoAgendamiento = true;
    this.servicioAgendamiento.get().subscribe({
      next: (agendamiento) => {
        this.listaAgendamiento = agendamiento;
        this.cargandoAgendamiento = false;
      },
      error: (e) => {
        console.error("Error al consultar agendamiento", e);
        this.cargandoAgendamiento = false;
        this.servicioToast.create({
          header: 'Error al cargar agendamiento',
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
    this.agendamientoSeleccionado = null;
    this.modalVisible = true;
  }
  public editar(agendamiento: Agendamiento) {
    this.agendamientoSeleccionado = agendamiento;
    this.modoFormulario = 'Editar';
    this.modalVisible = true;

  }
  public cargarDatosEditar() {
    if (this.modoFormulario === 'Editar') {
      this.formularioAgendamiento.modo = this.modoFormulario;
      this.formularioAgendamiento.form.controls.idagendamientoCtrl.setValue(this.agendamientoSeleccionado.idagendamiento);
      this.formularioAgendamiento.form.controls.fechaagendamientoCtrl.setValue(this.agendamientoSeleccionado.fechaagendamiento);
      this.formularioAgendamiento.form.controls.fecha_confirmacionCtrl.setValue(this.agendamientoSeleccionado.fecha_confirmacion);
      this.formularioAgendamiento.form.controls.paciente_ciCtrl.setValue(this.agendamientoSeleccionado.paciente_ci);
      this.formularioAgendamiento.form.controls.doctor_ciCtrl.setValue(this.agendamientoSeleccionado.doctor_ci);

    }
  }
  public ConfirmarEliminacion(agendamiento: Agendamiento) {
    this.servicioAlert.create({
      header: 'confirmar eliminacion',
      subHeader: '¿Realmente desea eliminar el agendamiento?',
      message: `${agendamiento.idagendamiento}-${agendamiento.fechaagendamiento}(${agendamiento.fecha_confirmacion})(${agendamiento.paciente_ci})(${agendamiento.doctor_ci})`,
      buttons: [{
        text: 'Canselar',

      }, {
        text: 'Eliminar',
        handler: () => this.eliminar(agendamiento)
        
      }
      ]
    }).then(a => a.present());
  }
  private eliminar(agendamiento: Agendamiento) {
    this.servicioAgendamiento.delete(agendamiento).subscribe({
      next: () => {
        this.cargarAgendamiento();
        this.servicioToast.create({
          header: 'Exito',
          message: 'El agendamiento se elimino correctamente',
          duration: 2000,
          position: 'bottom',
          color: 'success'
        }).then(t => t.present());
      },
      error: (e) => {
        console.error('Error al eliminar agendamiento', e);
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

