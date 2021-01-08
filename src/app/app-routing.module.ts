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
  { path: 'admin', loadChildren: () => import ('src/app/votations-admin/admin.module').then(m => m.AdminModule), canActivate: [SessionGuard, AdminGuard] },
  // Crear módulos en cada una de las rutas definidas.
//  { path: 'votations-owner', loadChildren: () => import ('src/app/votations-owner/owner.module').then(m => m.OwnerModule), canActivate: [SessionGuard, UserGuard] },
//  { path: 'votations-secretary', loadChildren: () => import ('src/app/votations-secretary/secretary.module').then(m => m.SecretaryModule), canActivate: [SessionGuard, SecretaryGuard] },
//  { path: 'votations-revisor', loadChildren: () => import ('src/app/votations-revisor/revisor.module').then(m => m.RevisorModule), canActivate: [SessionGuard, RevisorGuard] },
  { path: '' , redirectTo: '', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
