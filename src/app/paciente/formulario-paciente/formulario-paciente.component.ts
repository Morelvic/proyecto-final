import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { Paciente } from 'src/app/interfaces/paciente.interface';

import { PacienteService } from 'src/app/servicios/paciente.service';


@Component({
  selector: 'app-formulario-paciente',
  templateUrl: './formulario-paciente.component.html',
  styleUrls: ['./formulario-paciente.component.scss'],
})

export class FormularioPacienteComponent implements OnInit {

  @Output()
  recargar = new EventEmitter<boolean>();
  public modo: "Registrar" | "Editar" = "Registrar";
  public listaPaciente: Paciente[] = [];

  public form: FormGroup = new FormGroup({
    idCtrl: new FormControl<number>(null, Validators.required),
    tituloCtrl: new FormControl<string>(null, Validators.required),
    idautorCtrl: new FormControl<number>(null, Validators.required),
    paginasCtrl: new FormControl<number>(null, Validators.required),
  });

  constructor(
    private servicioPaciente: PacienteService,
    private serviciosToast: ToastController,
  ) { }
  private cargarPaciente() {
    this.servicioPaciente.get().subscribe({
      next: (paciente) => {
        this.listaPaciente = paciente;
      },
      error: (e) => {
        console.error('Error al cargar', e);
        this.serviciosToast.create({
          header: 'Error al cargar Paciente',
          message: e.error,
          color: 'danger'
        })
      }
    });
  }
  ngOnInit() {
    this.cargarPaciente();
  }
  guardar() {
    this.form.markAllAsTouched();
    if (this.form.valid) {
      if (this.modo === 'Registrar') {
        this.registrar();
      } else {
        this.editar();
      }

    }
  }
  private registrar() {
    const paciente: Paciente = {
      ci: this.form.controls.ciCtrl.value,
      nombre: this.form.controls.nombreCtrl.value,
      apellido: this.form.controls.apellidoCtrl.value,
      telefono: this.form.controls.telefonoCtrl.value,
      direccion: this.form.controls.direccionCtrl.value,
      ciudad_idciudad: this.form.controls.ciudad_idciudadCtrl.value,
     
    }
    this.servicioPaciente.post(paciente).subscribe({
      next: () => {
        this.recargar.emit(true);
        this.serviciosToast.create({
          header: 'Exito',
          message: 'Se registro correctamente el doctor',
          duration: 2000,
          color: 'success'
        }).then(t => t.present());
      },
      error: (e) => {
        console.error('Error al registrar doctor', e);
        this.serviciosToast.create({
          header: 'Error al registrar',
          message: e.message,
          duration: 3500,
          color: 'danger',
        }).then(t => t.present());
      }
    });
  }
  private editar() {
    const paciente: Paciente = {
      ci: this.form.controls.ciCtrl.value,
      nombre: this.form.controls.nombreCtrl.value,
      apellido: this.form.controls.nombreCtrl.value,
      telefono: this.form.controls.telefonoCtrl.value,
      direccion: this.form.controls.direccionCtrl.value,
      ciudad_idciudad: this.form.controls.ciudad_idciudadCtrl.value,
    
    }
    this.servicioPaciente.put(paciente).subscribe({
      next: () => {
        this.recargar.emit(true);
        this.serviciosToast.create({
          header: 'Exito',
          message: 'Se edito correctamente el paciente',
          duration: 2000,
          color: 'success'
        }).then(t => t.present());
      },
      error: (e) => {
        console.error('Error al Editar paciente', e);
        this.serviciosToast.create({
          header: 'Error al Editar',
          message: e.message,
          duration: 3500,
          color: 'danger',
        }).then(t => t.present());
      }
    });
  }
}
