import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PropiedadHorizontalService } from '../../../services/sgph/propiedad-horizontal.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { UserService } from '../../../services/sgph/user.service';

@Component({
  selector: 'app-revisor',
  templateUrl: './revisor.component.html',
  styleUrls: ['./revisor.component.scss']
})
export class RevisorComponent implements OnInit {

  // Form
  public formRevisor = new FormGroup({
    revisor: new FormGroup({
      nombres: new FormControl('', [Validators.required]),
      tipoDocumento: new FormControl('', [Validators.required]),
      numeroDocumento: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    })
  });

  // Attributes
  public existeRevisor = false;
// Decidí hacer un registro secretario y revisor separados, porque es más claro para el usuario saber lo que hará
  constructor(private phService: PropiedadHorizontalService,
              private router: Router,
              public userService: UserService) { }

  public ngOnInit(): void {
    this.getExisteRevisor();
  }

  public getExisteRevisor(){
    this.phService.getRevisor().subscribe((data: any) => {
      this.existeRevisor = data.existeRevisor;
    });
  }

  public registrarRevisor(): void{
    const dataPersonal = Object.assign(this.formRevisor.value.revisor);

    const revisor = {
      dataPersonal,
      idPropiedadHorizontal: this.userService.getUsuario().idPropiedadHorizontal,
      rol: 'REVISOR',
      estado: true
    };

    this.phService.postRevisor(revisor).subscribe(
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
            title: 'Existe un revisor',
            text: 'Un usuario con el rol de revisor está activo en el sistema. Elimínelo',
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
            text: 'El revisor ya puede iniciar sesión con el email y contraseña ingresados',
            icon: 'success',
            showConfirmButton: true,
            onClose: () => {
              this.formRevisor.reset();
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
