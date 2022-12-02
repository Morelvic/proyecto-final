import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AgendamientoPageRoutingModule } from './agendamiento-routing.module';

import { AgendamientoPage } from './agendamiento.page';
import { AgendamientoService } from '../servicios/agendamiento.service';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { FormularioAgendamientoComponent } from './formulario-agendamiento/formulario-agendamiento.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AgendamientoPageRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  declarations: [AgendamientoPage, FormularioAgendamientoComponent],
  providers: [AgendamientoService]
})
export class AgendamientoPageModule {}
