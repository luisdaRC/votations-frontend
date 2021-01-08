import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './home/login/login.component';
import { SessionGuard } from './services/guards/session/session.guard';
import { UserGuard } from './services/guards/user/user.guard';
import { AdminGuard } from './services/guards/admin/admin.guard';
import { SecretaryGuard } from './services/guards/secretary/secretary.guard';
import { RevisorGuard } from './services/guards/revisor/revisor.guard';
const routes: Routes = [

  { path: 'login', component: LoginComponent },
  { path: 'votations-admin', loadChildren: './votations-admin/admin.module#AdminModule' , canActivate: [SessionGuard, AdminGuard] },
  { path: 'votations-owner', loadChildren: './votations-owner/votations-owner.module#OwnerModule', canActivate: [SessionGuard, UserGuard] },
  { path: 'votations-secretary', loadChildren: './votations-secretary/votations-secretary.module#SecretaryModule', canActivate: [SessionGuard, SecretaryGuard] },
  { path: 'votations-revisor', loadChildren: './votations-revisor/votations-revisor.module#RevisorModule', canActivate: [SessionGuard, RevisorGuard] },
  { path: '' , redirectTo: '', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
