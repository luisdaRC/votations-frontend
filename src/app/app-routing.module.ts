import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './home/login/login.component';
import { TerminosCondicionesComponent } from './home/terminos-condiciones/terminos-condiciones.component';
import { SessionGuard } from './services/guards/session/session.guard';
import { OwnerGuard } from './services/guards/owner/owner.guard';
import { AdminGuard } from './services/guards/admin/admin.guard';
import { SuperAdminGuard } from './services/guards/super-admin/super-admin.guard';
import { SecretaryGuard } from './services/guards/secretary/secretary.guard';
import { RevisorGuard } from './services/guards/revisor/revisor.guard';


const routes: Routes = [

  { path: '', component: LoginComponent },
  { path: 'terminos-condiciones', component: TerminosCondicionesComponent},
  { path: 'admin', loadChildren: () => import ('src/app/admin/admin.module').then(m => m.AdminModule), canActivate: [SessionGuard, AdminGuard] },
  { path: 'owner', loadChildren: () => import ('src/app/owner/owner.module').then(m => m.OwnerModule), canActivate: [SessionGuard, OwnerGuard] },
  { path: 'super-admin', loadChildren: () => import ('src/app/super-admin/super-admin.module').then(m => m.SuperAdminModule), canActivate: [SessionGuard, SuperAdminGuard] },
  { path: 'revisor', loadChildren: () => import ('src/app/revisor/revisor.module').then(m => m.RevisorModule), canActivate: [SessionGuard, RevisorGuard] },
  { path: 'secretary', loadChildren: () => import ('src/app/secretary/secretary.module').then(m => m.SecretaryModule), canActivate: [SessionGuard, SecretaryGuard] },

  { path: '' , redirectTo: '', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
