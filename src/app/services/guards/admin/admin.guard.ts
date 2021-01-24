import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UserService } from '../../sgph/user.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate  {

  constructor(private userService: UserService,  private router: Router){

  }

  public canActivate(): boolean{

    if ( this.userService.isAdmin()) {
      return true;
    } else {
      this.router.navigate(['/']);
      return false;
    }

  }

}
