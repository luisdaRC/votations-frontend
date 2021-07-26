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
        if (data === 1) {
          Swal.fire({
            title: 'Cuidado.',
            text: 'No existe la propiedad horizontal referenciada.',
            icon: 'warning',
            showConfirmButton: true
          });
        } else if (data === 2) {
          Swal.fire({
            title: 'Existe un secretario',
            text: 'Un usuario con el rol de secretario está activo en el sistema. Elimínelo',
            icon: 'warning',
            showConfirmButton: true
          });
        } else if (data === 3) {
          Swal.fire({
            title: 'Cuidado!',
            text: 'Existe un usuario con el email ingresado.',
            icon: 'warning',
            showConfirmButton: true
          });
        }else if (data === 4){
          Swal.fire({
            title: 'Registro Exitoso!',
            text: 'El secretario ya puede iniciar sesión con el email y contraseña ingresados',
            icon: 'success',
            showConfirmButton: true,
            onClose: () => {
              this.formSecretary.reset();
              this.router.navigate(['/admin']);
            }
          });
        }else if (data === 5) {
          Swal.fire({
            title: 'Registre los coeficientes para proceder con esta operación',
            text: 'Los coeficientes de copropiedad no están debidamente registrados. El sistema ha detectado que no suman 100%.',
            icon: 'warning',
            showConfirmButton: true
          });
        }
      }
    );

  }

}
