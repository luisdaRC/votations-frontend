import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {PropiedadHorizontalService} from '../../../services/sgph/propiedad-horizontal.service';
import {Router} from '@angular/router';
import {UserService} from '../../../services/sgph/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-secretary',
  templateUrl: './secretary.component.html',
  styleUrls: ['./secretary.component.scss']
})
export class SecretaryComponent implements OnInit {
// Que el control para que el secretario luego de acabada la asamblea no pueda seguir realizando acciones sea
// la fecha de finalización de la asamblea (el estado. Cambiarlo cuando finalice la asamblea)

  // Form
  public formSecretary = new FormGroup({ // Rol y estado se ponen fijos en el back
    secretary: new FormGroup({
      nombres: new FormControl('', [Validators.required]),
      tipoDocumento: new FormControl('', [Validators.required]),
      numeroDocumento: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    })
  });

  // Attributes
  public existeSecretary = false;
  constructor(private phService: PropiedadHorizontalService,
              private router: Router,
              public userService: UserService) { }

  public ngOnInit(): void {
    this.getExisteSecretary();
  }

  public getExisteSecretary(): void{
    this.phService.getSecretary().subscribe((data: any) => {
      this.existeSecretary = data.existeSecretary;
    });
  }

  public registrarSecretary(): void{
    const dataPersonal = Object.assign(this.formSecretary.value.secretary);

    const secretary = {
      dataPersonal,
      idPropiedadHorizontal: this.userService.getUsuario().idPropiedadHorizontal,
      rol: 'SECRETARIO',
      estado: true
    };

    this.phService.postSecretary(secretary).subscribe(
      (data: any) => {

        Swal.fire({
          title: ' ¡Registro Exitoso!',
          text: 'El secretario ya puede iniciar sesión con el email y contraseña ingresados',
          icon: 'success',
          showConfirmButton: true,
          onClose: () => {
            this.formSecretary.reset();
            this.router.navigate(['/admin']);
          }
        });

      }
    );

  }

}
