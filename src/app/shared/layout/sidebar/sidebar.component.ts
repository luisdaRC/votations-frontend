import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../../services/sgph/user.service';
import { SidebarService } from '../../../services/extras/sidebar.service';
import { AppService } from '../../../services/extras/app.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  constructor(
    public appService: AppService,
    public sidebarservice: SidebarService,
    public userService: UserService,
    public router: Router) {

  }

  ngOnInit() {  }

  public perfil(): void {

    if (this.userService.getRol('PROPIETARIO')){
      this.router.navigate(['/owner/profile']);
    }
    if (this.userService.getRol('ADMINISTRADOR')){
      this.router.navigate(['/admin/profile']);
    }
    if (this.userService.getRol('SUPER_ADMINISTRADOR')){
      this.router.navigate(['/super-admin/profile']);
    }
    if (this.userService.getRolCont('SECRETARIO')){
      this.router.navigate(['/secretary/profile']);
    }
    if (this.userService.getRolCont('REVISOR')){
      this.router.navigate(['/revisor/profile']); // Route doesn't exist
    }
  }

  public nombre(): string {
    if (this.userService.getRol('SUPER_ADMINISTRADOR')){
      return this.userService.getUsuario().nombrePH;
    } else if (this.userService.getRolCont('SECRETARIO') || this.userService.getRolCont('REVISOR')){
      return this.userService.getUsuarioControl().nombres;
    } else {
      return this.userService.getUsuario().nombre;
    }
  }

  public apellido(): string {
    if (this.userService.getRolCont('SECRETARIO') || this.userService.getRolCont('REVISOR')){
      return '';
    } else {
      return this.userService.getUsuario().apellido || '';
    }
  }

  public rol(): string {
    if (this.userService.getRolCont('SECRETARIO') || this.userService.getRolCont('REVISOR')){
      return this.userService.getUsuarioControl().rol;
    } else {
      return this.userService.getUsuario().roles.toString().replace('_', ' ');
    }
  }

}
