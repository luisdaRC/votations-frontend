import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {SecretaryComponent} from './secretary.component';


import {InicioComponent} from './inicio/inicio.component';
import {ListarAsistentesComponent} from './listar-asistentes/listar-asistentes.component';

const routes: Routes = [
  {
    path: '',
    component: SecretaryComponent,
    children: [
      {path: 'inicio', component: InicioComponent},
      {path: 'listar-asistentes', component: ListarAsistentesComponent},
      {path: '', redirectTo: 'inicio', pathMatch: 'full'}
    ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SecretaryRoutingModule { }
