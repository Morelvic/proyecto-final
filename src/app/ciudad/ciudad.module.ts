import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CiudadPageRoutingModule } from './ciudad-routing.module';
import { CiudadPage } from './ciudad.page';
import { HttpClientModule } from '@angular/common/http';
import { CiudadService } from '../servicios/ciudad.service';
import { ReactiveFormsModule } from '@angular/forms';
import { FormularioCiudadComponent } from './formulario-ciudad/formulario-ciudad.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CiudadPageRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  declarations: [CiudadPage,FormularioCiudadComponent],

  providers: [CiudadService]
})
export class CiudadPageModule {}
