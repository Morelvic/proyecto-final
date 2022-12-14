import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { DoctorPageRoutingModule } from './doctor-routing.module';
import { FormularioDoctorComponent } from './formulario-doctor/formulario-doctor.component';
import { DoctorService } from '../servicios/doctor.service';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { DoctorPage } from './doctor.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DoctorPageRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
    
  ],
  declarations: [DoctorPage,FormularioDoctorComponent],

  providers: [DoctorService]
  
})
export class DoctorPageModule {}
