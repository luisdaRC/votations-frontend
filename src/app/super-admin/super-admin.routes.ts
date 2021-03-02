import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {SuperAdminComponent} from './super-admin.component';
import {InicioComponent} from './inicio/inicio.component';
import {ProfileSuperAdminComponent} from './profile/profile.component';
import {DataComponent} from './update/data/data.component';

const routes: Routes = [
  {
    path: '',
    component: SuperAdminComponent,
    children: [
      {path: 'inicio', component: InicioComponent},
      {path: 'profile', component: ProfileSuperAdminComponent},
      {path: 'update/data', component: DataComponent},
      {path: '', redirectTo: 'inicio', pathMatch: 'full'}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SuperAdminRoutingModule { }
