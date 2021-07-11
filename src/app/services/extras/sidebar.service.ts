import { Injectable } from '@angular/core';
import { UserService } from '../sgph/user.service';
import { SUPER_ADMINISTRADOR } from '../permission/SuperAdministrador';
import { ADMINISTRADOR } from '../permission/Administrador';
import { Router } from '@angular/router';
import { PROPIETARIO } from '../permission/Propietario';
import { REVISOR_FISCAL } from '../permission/RevisorFiscal';
import { SECRETARIO } from '../permission/Secretario';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  public menus: any[];


  constructor(
    private userService: UserService,
    public router: Router) {
    this.init();
  }


  public init(){
    this.setValuesSGPH();
  }

  public setValuesSGPH() {
    this.menus =  [];

    if (this.userService.getRol('PROPIETARIO')) {
      this.menus = PROPIETARIO;
    }

    if (this.userService.getRol('ADMINISTRADOR')){
      this.menus = ADMINISTRADOR;
    }

    if (this.userService.getRolCont('REVISOR')){
      this.menus = REVISOR_FISCAL;
    }

    if (this.userService.getRolCont('SECRETARIO')){
      this.menus = SECRETARIO;
    }
    if (this.userService.getRol('SUPER_ADMINISTRADOR')){
      this.menus = SUPER_ADMINISTRADOR;
    }
  }

}
