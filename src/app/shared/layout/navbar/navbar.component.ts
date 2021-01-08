import { Component, OnInit } from '@angular/core';
import { AppService } from '../../../services/extras/app.service';
import { UserService } from '../../../services/sgph/user.service';
import { Router } from '@angular/router';
import { SidebarService } from '../../../services/extras/sidebar.service';
declare const  $;

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
// Editar para que las rutas sean accesibles desde los distintos usuarios
export class NavbarComponent implements OnInit {

  public title: string = 'SGPH';
  public picture: string;
  public isCollapsed = true;

  constructor(
    public appService: AppService,
    public userService: UserService,
    private router: Router,
    public sidebarservice: SidebarService) {
  }




  ngOnInit() {
    this.picture="../../../../assets/img/angular2.png"
    $(function () {
      $('[data-toggle="tooltip"]').tooltip({
        trigger: 'hover'
      });
    });
  }

  public setSGPHoptions(){

    this.title="SGPH"
    this.sidebarservice.setValuesSGPH();

    if(this.userService.getRol('SUPER_ADMINISTRADOR')
      || this.userService.getRol('ADMINISTRADOR')){
      this.router.navigate(['/sgph/inicio']);
    }else{
      this.router.navigate(['/sgph-owner/inicio']);
    }

  }

  profile(){
    this.isCollapsed = true;
    if(this.userService.getRol('SUPER_ADMINISTRADOR')
      || this.userService.getRol('ADMINISTRADOR')){
      this.router.navigate(['/sgph/mi-perfil']);
    }else{
      this.router.navigate(['/sgph-owner/mi-perfil']);
    }
  }



  toggleSidebarPin() {
    this.appService.toggleSidebarPin();
  }
  toggleSidebar() {
    this.appService.toggleSidebar();
  }

  public logout(){
    $('#cerrar-session').tooltip('hide');
    this.sidebarservice.menus = [];
    this.userService.logout();
    this.router.navigate(['/']);
  }


}
