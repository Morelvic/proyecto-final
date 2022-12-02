import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { PacientePageRoutingModule } from './paciente-routing.module';
import { PacientePage } from './paciente.page';
import { FormularioPacienteComponent } from './formulario-paciente/formulario-paciente.component';
import { PacienteService } from '../servicios/paciente.service';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PacientePageRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  declarations: [PacientePage,FormularioPacienteComponent],

  providers:[PacienteService]
})
export class PacientePageModule {}