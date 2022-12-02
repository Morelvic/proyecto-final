import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'doctor',
    loadChildren: () => import('./doctor/doctor.module').then( m => m.DoctorPageModule)
  },
  {
    path: 'agendamiento',
    loadChildren: () => import('./agendamiento/agendamiento.module').then( m => m.AgendamientoPageModule)
  },
  {
    path: 'paciente',
    loadChildren: () => import('./paciente/paciente.module').then( m => m.PacientePageModule)
  },
  {
    path: 'ciudad',
    loadChildren: () => import('./ciudad/ciudad.module').then( m => m.CiudadPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
