import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/sgph/user.service';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import Swal from 'sweetalert2';
import { MODULOS } from 'src/app/services/constants/modulos';
import { SidebarService } from '../../services/extras/sidebar.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  // Form
  public form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]),
    password: new FormControl('', [Validators.required])
  });

  constructor(
    private sidebarService: SidebarService,
    private userService: UserService,
    private route: Router) { }

  public ngOnInit(): void {
  }


  public iniciarSesion(): void {

    this.userService.postIniciarSesion(this.form.value).subscribe( // Se puede hacer un llamado al otro método de iniciar sesión de revisor y secretario antes de que el error sea lanzado

      (data: any) => {
        if (data.roles.length === 0){
          Swal.fire('¡Error al iniciar Sesión!', 'El usuario no cuenta con roles', 'error');
        }else{
          const ROL = this.userService.getRolPhMan(data.roles);
          this.route.navigate( [MODULOS[ROL]]);
          this.sidebarService.init();
        }

      },
      error => {
        Swal.fire('¡Error al iniciar Sesión!', error.error, 'error');
      }
    );
  }
}
