import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { Agendamiento } from 'src/app/interfaces/agendamiento.interface';
import { Paciente } from 'src/app/interfaces/paciente.interface';
import { AgendamientoService } from 'src/app/servicios/agendamiento.service';
import { PacienteService } from 'src/app/servicios/paciente.service';
import { Doctor } from 'src/app/interfaces/doctor.interface';
import { DoctorService } from 'src/app/servicios/doctor.service';

@Component({
  selector: 'app-formulario-agendamiento',
  templateUrl: './formulario-agendamiento.component.html',
  styleUrls: ['./formulario-agendamiento.component.scss'],
})

export class FormularioAgendamientoComponent implements OnInit {

  @Output()
  recargar = new EventEmitter<boolean>();
  public modo: "Registrar" | "Editar" = "Registrar";
  public listaPaciente: Paciente[] = [];
  public listaDoctor: Doctor[] = [];

  public form: FormGroup = new FormGroup({
    idagendamientoCtrl: new FormControl<number>(null, Validators.required),
    fechaagendamientoCtrl: new FormControl<string>(null, Validators.required),
    fechaconfirmacionCtrl: new FormControl<string>(null, Validators.required),
    pacienteciCtrl: new FormControl<number>(null, Validators.required),
    doctorciCtrl: new FormControl<number>(null, Validators.required),
  });


  constructor(
    private servicioPaciente: PacienteService,
    private serviciosToast: ToastController,
    private sevicioAgendamiento: AgendamientoService,
    private servicioDoctor: DoctorService
  ) { }
  private cargarPaciente() {
    this.servicioPaciente.get().subscribe({
      next: (paciente) => {
        /*console.log(paciente);*/
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

  private cargarDoctor() {
    this.servicioDoctor.get().subscribe({
      next: (doctor) => {
        /*console.log(paciente);*/
        this.listaDoctor = doctor;
      },
      error: (e) => {
        console.error('Error al cargar', e);
        this.serviciosToast.create({
          header: 'Error al cargar Doctor',
          message: e.error,
          color: 'danger'
        })
      }
    });
  }
  ngOnInit() {
    this.cargarPaciente();
    this.cargarDoctor();
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
   registrar() {
    const agendamiento: Agendamiento = {
      idagendamiento: 0,
      fechaagendamiento: this.form.controls.fechaagendamientoCtrl.value,
      fecha_confirmacion: this.form.controls.fechaagendamientoCtrl.value,
      paciente_ci: this.form.controls.pacienteciCtrl.value,
      doctor_ci: this.form.controls.doctorciCtrl.value
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
