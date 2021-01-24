import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from '../../services/sgph/user.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile-super',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileSuperAdminComponent implements OnInit {

  public user = this.userService.getUsuario();
  public form = new FormGroup({
    contrasenaActual: new FormControl('', [Validators.required]),
    contrasenaNueva: new FormControl('', [Validators.required]),
    contrasenaNuevaConfirmada: new FormControl('', [Validators.required])
  });

  constructor(
    public router: Router,
    private userService: UserService
  ) { }

  ngOnInit(): void {
  }

  public cambiarContrasena(): void {
    this.userService.postCambiarContrasena(this.form.value).subscribe(data => {
      this.userService.getUsuario().cambiarContraseña = false;
      Swal.fire({
        title: ' ¡Contraseña Actualizada!',
        text: 'Se ha actualizado la contraseña correctamente',
        icon: 'success',
        showConfirmButton: true,
        onClose: () => {
          this.router.navigate(['/super-admin']);
        }
      });

    });
  }

}
