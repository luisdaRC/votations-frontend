import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AdminComponent} from './admin.component';
import {InicioComponent} from './inicio/inicio.component';
import {ProfileAdminComponent} from './profile/profile.component';
import {AdComponent} from './registry/ad/ad.component';
import {RevisorComponent} from './registry/revisor/revisor.component';
import {SecretaryComponent} from './registry/secretary/secretary.component';
import {SupportPersonalComponent} from './delete/support-personal/support-personal.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      {path: 'inicio', component: InicioComponent},
      {path: 'profile', component: ProfileAdminComponent},
      {path: 'registry/ad', component: AdComponent},
      {path: 'registry/revisor', component: RevisorComponent},
      {path: 'registry/secretary', component: SecretaryComponent},
      {path: 'delete/support-personal', component: SupportPersonalComponent},
      {path: '', redirectTo: 'inicio', pathMatch: 'full'}
    ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
