import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { Agendamiento } from 'src/app/interfaces/agendamiento.interface';

import { AgendamientoService } from 'src/app/servicios/agendamiento.service';

@Component({
  selector: 'app-formulario-agendamiento',
  templateUrl: './formulario-agendamiento.component.html',
  styleUrls: ['./formulario-agendamiento.component.scss'],
})

export class FormularioAgendamientoComponent implements OnInit {

  @Output()
  recargar = new EventEmitter<boolean>();
  public modo: "Registrar" | "Editar" = "Registrar";
  public listaAgendamiento: Agendamiento[] = [];

  public form: FormGroup = new FormGroup({
    idagendamientoCtrl: new FormControl<number>(null, Validators.required),
    fechaagendamientoCtrl: new FormControl<string>(null, Validators.required),
    fechaconfirmacionCtrl: new FormControl<string>(null, Validators.required),
    pacienteciCtrl: new FormControl<number>(null, Validators.required),
    doctorciCtrl: new FormControl<number>(null, Validators.required),
  });

  constructor(
    private servicioAgendamiento: AgendamientoService,
    private serviciosToast: ToastController,
    private sevicioAgendamiento: AgendamientoService
  ) { }
  private cargarAgendamiento() {
    this.servicioAgendamiento.get().subscribe({
      next: (agendamiento) => {
        this.listaAgendamiento = agendamiento;
      },
      error: (e) => {
        console.error('Error al cargar', e);
        this.serviciosToast.create({
          header: 'Error al cargar Agendamiento',
          message: e.error,
          color: 'danger'
        })
      }
    });
  }
  ngOnInit() {
    this.cargarAgendamiento();
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
    const agendamiento: Agendamiento = {
      idagendamiento: this.form.controls.idagendamientoCtrl.value,
      fechaagendamiento: this.form.controls.fechaagendamientoCtrl.value,
      fecha_confirmacion: this.form.controls.fecha_confirmacionCtrl.value,
      paciente_ci: this.form.controls.paciente_ciCtrl.value,
      doctor_ci: this.form.controls.doctor_ciCtrl.value
    }
    this.sevicioAgendamiento.post(agendamiento).subscribe({
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
        console.error('Error al registrar agendamiento', e);
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
    const agendamiento: Agendamiento = {
      idagendamiento: this.form.controls.idagendamientoCtrl.value,
      fechaagendamiento: this.form.controls.fechaagendamientoCtrl.value,
      fecha_confirmacion: this.form.controls.fecha_confirmacionCtrl.value,
      paciente_ci: this.form.controls.paciente_ciCtrl.value,
      doctor_ci: this.form.controls.doctor_ciCtrl.value
    }
    this.sevicioAgendamiento.put(agendamiento).subscribe({
      next: () => {
        this.recargar.emit(true);
        this.serviciosToast.create({
          header: 'Exito',
          message: 'Se edito correctamente el agendamiento',
          duration: 2000,
          color: 'success'
        }).then(t => t.present());
      },
      error: (e) => {
        console.error('Error al Editar doctor', e);
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
