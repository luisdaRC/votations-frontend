import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/sgph/user.service';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Router, RouteConfigLoadStart, RouteConfigLoadEnd } from '@angular/router';
import Swal from 'sweetalert2';
import { MODULOS } from 'src/app/services/constants/modulos';
import { SidebarService } from '../../services/extras/sidebar.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  private spinner: HTMLElement;

  // Form
  public form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]),
    password: new FormControl('', [Validators.required])
  });

  constructor(
    private sidebarService: SidebarService,
    private userService: UserService,
    private router: Router) { }

  public ngOnInit(): void {
    this.spinner = document.getElementById('app-loading');
    this.loadingMainModule();
  }

  private loadingMainModule(): void {
    this.router.events.subscribe(event => {

      if (event instanceof RouteConfigLoadStart) {
        this.spinner.classList.add('d-block');
      } else if (event instanceof RouteConfigLoadEnd) {
        this.spinner.classList.remove('d-block');
      }
    });
  }

  public iniciarSesion(): void {
    this.spinner.classList.add('d-block');
    this.userService.postIniciarSesion(this.form.value).subscribe(

      (data: any) => {
        if (data.roles.length === 0){
          Swal.fire('¡Error al iniciar Sesión!', 'El usuario no cuenta con roles', 'error');
        }else{
          const ROL = this.userService.getRolPhMan(data.roles);
          this.router.navigate( [MODULOS[ROL]]);
          this.sidebarService.init();
        }
      },
     error => {
       this.loginControl();
      }
    );
  }

  public loginControl(): void{
    this.spinner.classList.add('d-block');
    this.userService.postLoginControl(this.form.value).subscribe(
      (data: any) => {
        this.router.navigate([MODULOS[data.rol]]);
        this.sidebarService.init();
      },
      error => {
        Swal.fire('¡Error al iniciar Sesión! Correo y/o contraseña incorrectos', error.error, 'error');
      }
    );
    this.spinner.classList.remove('d-block');
  }
}
