import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {RevisorComponent} from './revisor.component';
import {InicioComponent} from './inicio/inicio.component';
import {ProcessComponent} from './check/process/process.component';

const routes: Routes = [
  {
    path: '',
    component: RevisorComponent,
    children: [
      {path: 'inicio', component: InicioComponent},
      {path: 'check/process', component: ProcessComponent},
      {path: '', redirectTo: 'inicio', pathMatch: 'full'}
    ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RevisorRoutingModule { }
