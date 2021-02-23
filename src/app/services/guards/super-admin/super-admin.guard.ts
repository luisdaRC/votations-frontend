import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UserService } from '../../sgph/user.service';

@Injectable({
  providedIn: 'root'
})
export class SuperAdminGuard implements CanActivate  {

  constructor(private userService: UserService,  private router: Router){

  }

  public canActivate(): boolean{ // Perfil de admin listo. Hacer perfil de SuperAdmin

    if ( this.userService.isSuperAdmin()) {
      return true;
    } else {
      this.router.navigate(['/']);
      return false;
    }

  }

}
