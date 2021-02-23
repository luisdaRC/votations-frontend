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
    if (this.userService.getRol('SECRETARIO')){
      this.router.navigate(['/secretary/profile']);
    }
    if (this.userService.getRol('REVISOR')){
      this.router.navigate(['/revisor/profile']);
    }

  }

}
