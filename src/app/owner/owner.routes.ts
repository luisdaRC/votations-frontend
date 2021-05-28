import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {InicioComponent} from './inicio/inicio.component';
import {EstadisticasComponent} from './estadisticas/estadisticas.component';
import {OwnerComponent} from './owner.component';

const routes: Routes = [
  {
    path: '',
    component: OwnerComponent,
    children: [
      {path: 'inicio', component: InicioComponent},
      {path: 'estadisticas', component: EstadisticasComponent},
      {path: '', redirectTo: 'inicio', pathMatch: 'full'}
    ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OwnerRoutingModule { }
