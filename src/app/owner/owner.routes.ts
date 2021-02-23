import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {InicioComponent} from './inicio/inicio.component';
import {ProfileOwnerComponent} from './profile/profile.component';
import {VoteComponent} from './vote/vote.component';

const routes: Routes = [

  { path: 'inicio', component: InicioComponent },
  { path: 'profile', component: ProfileOwnerComponent },
  { path: 'vote', component: VoteComponent },
  { path: '' , redirectTo: 'inicio', pathMatch: 'full'},
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OwnerRoutingModule { }
