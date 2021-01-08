import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {InicioComponent} from './inicio/inicio.component';
import {ProfileAdminComponent} from './profile-admin/profile-admin.component';
import {AdComponent} from './registry/ad/ad.component';
import {RevisorComponent} from './registry/revisor/revisor.component';
import {SecretaryComponent} from './registry/secretary/secretary.component';

const routes: Routes = [

  { path: 'inicio', component: InicioComponent },
  { path: 'profile-admin', component: ProfileAdminComponent },
  { path: 'registry/ad', component: AdComponent },
  { path: 'registry/revisor', component: RevisorComponent },
  { path: 'registry/secretary', component: SecretaryComponent },
  { path: '' , redirectTo: 'inicio', pathMatch: 'full'},
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
