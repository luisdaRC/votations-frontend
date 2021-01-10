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
//    this.router.url.includes('phman') ? this.setValuesPHMAN() : this.setValuesSGPH();
    this.setValuesSGPH();
  }



  public setValuesSGPH() {
    this.menus =  [];

/*    if(this.userService.getRol('RESIDENTE')){
      this.menus.push(RESIDENTE[0]);
      this.menus.push(RESIDENTE[1]);
    }*/
    if (this.userService.getRol('PROPIETARIO')) {
      this.menus.push(PROPIETARIO);
    }
/*    if(this.userService.getRol('CONSEJO')){
      this.menus.push(PROPIETARIO_CONSEJO);
    }*/

    if (this.userService.getRol('ADMINISTRADOR')){
      this.menus = ADMINISTRADOR;
    }

    if (this.userService.getRol('REVISOR')){ // Si no funciona igualando, probar con el push, como arriba.
      this.menus = REVISOR_FISCAL;
    }

    if (this.userService.getRol('SECRETARIO')){
      this.menus = SECRETARIO;
    }
    if(this.userService.getRol('SUPER_ADMINISTRADOR')){
      this.menus = SUPER_ADMINISTRADOR;
    }
  }
/*  public setValuesPHMAN() {
    this.menus =  [];
    const role: string = this.userService.getRolPhMan(this.userService.getUsuario().roles);

    if (role === "VIGILANTE") {
      this.menus = ACCESSCONTROL;

    } else {
      this.menus = ACCESSCONTROL_ADMIN;
    }
    return this.menus;
  }*/



}
