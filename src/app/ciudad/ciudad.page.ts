import { Component, OnInit, ViewChild } from '@angular/core';
import { AlertController, IonRefresher, ToastController } from '@ionic/angular';
import { Ciudad } from '../interfaces/ciudad.interface';
import { CiudadService } from '../servicios/ciudad.service';
import { FormularioCiudadComponent } from './formulario-ciudad/formulario-ciudad.component';

@Component({
  selector: 'app-ciudad',
  templateUrl: './ciudad.page.html',
  styleUrls: ['./ciudad.page.scss'],
})
export class CiudadPage implements OnInit {
  @ViewChild(IonRefresher) refresher: IonRefresher;
  @ViewChild(FormularioCiudadComponent) formularioCiudad!: FormularioCiudadComponent;

  public listaCiudad: Ciudad[] = [];
  public cargandoCiudad: boolean = false;
  public modalVisible: boolean = false;
  private ciudadSeleccionado: Ciudad | null = null;

  public modoFormulario: 'Registrar' | 'Editar' | 'Registrar';

  libro: any;
  constructor(
    private servicioCiudad: CiudadService,
    private servicioToast: ToastController,
    private servicioAlert: AlertController
  ) { }

  ngOnInit() {
    this.cargarCiudad();
  }
  public cargarCiudad() {
    this.refresher?.complete();
    this.cargandoCiudad = true;
    this.servicioCiudad.get().subscribe({
      next: (ciudad) => {
        this.listaCiudad = ciudad;
        this.cargandoCiudad = false;
      },
      error: (e) => {
        console.error("Error al consultar ciudad", e);
        this.cargandoCiudad = false;
        this.servicioToast.create({
          header: 'Error al cargar ciudad',
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
    this.ciudadSeleccionado = null;
    this.modalVisible = true;
  }
  public editar(ciudad: Ciudad) {
    this.ciudadSeleccionado = ciudad;
    this.modoFormulario = 'Editar';
    this.modalVisible = true;

  }
  public cargarDatosEditar() {
    if (this.modoFormulario === 'Editar') {
      this.formularioCiudad.modo = this.modoFormulario;
      this.formularioCiudad.form.controls.ciCtrl.setValue(this.ciudadSeleccionado.idciudad);
      this.formularioCiudad.form.controls.nombreCtrl.setValue(this.ciudadSeleccionado.nombre);


    }
  }
  public ConfirmarEliminacion(ciudad: Ciudad) {
    this.servicioAlert.create({
      header: 'confirmar eliminacion',
      subHeader: '¿Realmente desea eliminar el ciudad?',
      message: `${ciudad.idciudad}-${ciudad.nombre}`,
      buttons: [{
        text: 'Canselar',

      }, {
        text: 'Eliminar',
        handler: () => this.eliminar(ciudad)
        
      }
      ]
    }).then(a => a.present());
  }
  private eliminar(ciudad: Ciudad) {
    this.servicioCiudad.delete(ciudad).subscribe({
      next: () => {
        this.cargarCiudad();
        this.servicioToast.create({
          header: 'Exito',
          message: 'El ciudad se elimino correctamente',
          duration: 2000,
          position: 'bottom',
          color: 'success'
        }).then(t => t.present());
      },
      error: (e) => {
        console.error('Error al eliminar ciudad', e);
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
