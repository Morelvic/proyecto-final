import { Component, OnInit, ViewChild } from '@angular/core';
import { AlertController, IonRefresher, ToastController } from '@ionic/angular';
import { Doctor } from '../interfaces/doctor.interface';
import { DoctorService } from '../servicios/doctor.service';
import { FormularioDoctorComponent } from './formulario-doctor/formulario-doctor.component';

@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.page.html',
  styleUrls: ['./doctor.page.scss'],
})
export class DoctorPage implements OnInit {
  @ViewChild(IonRefresher) refresher: IonRefresher;
  @ViewChild(FormularioDoctorComponent) formularioDoctor!: FormularioDoctorComponent;

  public listaDoctor: Doctor[] = [];
  public cargandoDoctor: boolean = false;
  public modalVisible: boolean = false;
  private doctorSeleccionado: Doctor | null = null;

  public modoFormulario: 'Registrar' | 'Editar' | 'Registrar';

  libro: any;
  constructor(
    private servicioDoctor: DoctorService,
    private servicioToast: ToastController,
    private servicioAlert: AlertController
  ) { }

  ngOnInit() {
    this.cargarDoctor();
  }
  public cargarDoctor() {
    this.refresher?.complete();
    this.cargandoDoctor = true;
    this.servicioDoctor.get().subscribe({
      next: (doctor) => {
        this.listaDoctor = doctor;
        this.cargandoDoctor = false;
      },
      error: (e) => {
        console.error("Error al consultar doctor", e);
        this.cargandoDoctor = false;
        this.servicioToast.create({
          header: 'Error al cargar doctor',
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
    this.doctorSeleccionado = null;
    this.modalVisible = true;
  }
  public editar(doctor: Doctor) {
    this.doctorSeleccionado = doctor;
    this.modoFormulario = 'Editar';
    this.modalVisible = true;

  }
  public cargarDatosEditar() {
    if (this.modoFormulario === 'Editar') {
      this.formularioDoctor.modo = this.modoFormulario;
      this.formularioDoctor.form.controls.ciCtrl.setValue(this.doctorSeleccionado.ci);
      this.formularioDoctor.form.controls.nombreCtrl.setValue(this.doctorSeleccionado.nombre);
      this.formularioDoctor.form.controls.apellidoCtrl.setValue(this.doctorSeleccionado.apellido);
      this.formularioDoctor.form.controls.especialidadCtrl.setValue(this.doctorSeleccionado.especialidad);

    }
  }
  public ConfirmarEliminacion(doctor: Doctor) {
    this.servicioAlert.create({
      header: 'confirmar eliminacion',
      subHeader: '¿Realmente desea eliminar el doctor?',
      message: `${doctor.ci}-${doctor.nombre}(${doctor.apellido})`,
      buttons: [{
        text: 'Canselar',

      }, {
        text: 'Eliminar',
        handler: () => this.eliminar(doctor)
        
      }
      ]
    }).then(a => a.present());
  }
  private eliminar(doctor: Doctor) {
    this.servicioDoctor.delete(doctor).subscribe({
      next: () => {
        this.cargarDoctor();
        this.servicioToast.create({
          header: 'Exito',
          message: 'El doctor se elimino correctamente',
          duration: 2000,
          position: 'bottom',
          color: 'success'
        }).then(t => t.present());
      },
      error: (e) => {
        console.error('Error al eliminar doctor', e);
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
