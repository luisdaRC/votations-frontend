import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {PropiedadHorizontalService} from '../../../services/sgph/propiedad-horizontal.service';
import {Router} from '@angular/router';
import {UserService} from '../../../services/sgph/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-coeficiente',
  templateUrl: './coeficiente.component.html',
  styleUrls: ['./coeficiente.component.scss']
})
export class CoeficienteComponent implements OnInit {

  // Form
  public formCoeficiente = new FormGroup({
    datos: new FormGroup({
      tipoDocumento: new FormControl('', [Validators.required]),
      numeroDocumento: new FormControl('', [Validators.required]),
      coeficiente: new FormControl('', [Validators.min(0.00001), Validators.max(50)])
    })
  });

  constructor(private phService: PropiedadHorizontalService,
              private router: Router,
              public userService: UserService) { }

  public ngOnInit(): void {
  }

  public registrarCoeficiente(): void{
    const dataCoeficiente = Object.assign(this.formCoeficiente.value.datos);

    this.phService.postCoeficiente(dataCoeficiente).subscribe(
      (data: any) => {

        Swal.fire({
          title: ' ¡Registro Exitoso!',
          text: 'El coeficiente del propietario se registró en la base de datos',
          icon: 'success',
          showConfirmButton: true,
          onClose: () => {
            this.formCoeficiente.reset();
            this.router.navigate(['/admin']);
          }
        });

      }
    );

  }
}
