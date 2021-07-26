import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {PropiedadHorizontalService} from '../../../services/sgph/propiedad-horizontal.service';
import {Router} from '@angular/router';
import {UserService} from '../../../services/sgph/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-poderes',
  templateUrl: './poderes.component.html',
  styleUrls: ['./poderes.component.scss']
})
export class PoderesComponent implements OnInit {

  // Form
  public formPoder = new FormGroup({ // idRepresentado se pone en el back
    poder: new FormGroup({
      nombres: new FormControl('', [Validators.required]),
      apellidos: new FormControl('', [Validators.required]),
      tipoDocumento: new FormControl('', [Validators.required]),
      numeroDocumento: new FormControl('', [Validators.required]),
      tipoDocumentoPropietario: new FormControl('', [Validators.required]),
      numeroDocumentoPropietario: new FormControl('', [Validators.required])
    })
  });

  constructor(private phService: PropiedadHorizontalService,
              private router: Router,
              public userService: UserService) { }

  ngOnInit(): void {
  }

  public registrarPoder(): void{
    const dataPoder = Object.assign(this.formPoder.value.poder);

    const poder = {
      dataPoder,
      idPropiedadHorizontal: this.userService.getUsuarioControl().idPropiedadHorizontal,
      rol: 'DESIGNADO'
    };

    this.phService.postPoder(poder).subscribe(
      (data: any) => {
        if (data === 0){
          Swal.fire({
            title: 'Cuidado!',
            text: 'El documento del propietario proporcionado no se encuentra en el sistema.',
            icon: 'success',
            showConfirmButton: true,
            onClose: () => {}
          });
        } else if (data === 1){
          Swal.fire({
            title: 'Registro Exitoso!',
            text: 'El designado fue correctamente registrado en el sistema.',
            icon: 'success',
            showConfirmButton: true,
            onClose: () => {
              this.formPoder.reset();
              this.router.navigate(['/secretary/inicio']);
            }
          });
        } else if (data === 2){
          Swal.fire({
            title: 'Comuníquese con el administrador del sistema',
            text: 'Ha ocurrido un error, intente más tarde.',
            icon: 'warning',
            showConfirmButton: true,
            onClose: () => {
              this.formPoder.reset();
              this.router.navigate(['/secretary/inicio']);
            }
          });
        } else if (data === 3){
          Swal.fire({
            title: 'Propietario registrado!',
            text: 'El propietario ingresado ya se encuentra registrado en la asamblea.',
            icon: 'warning',
            showConfirmButton: true,
            onClose: () => {
              this.formPoder.reset();
              this.router.navigate(['/secretary/inicio']);
            }
          });
        } else if (data === 4){
          Swal.fire({
            title: 'Comuníquese con el administrador de la propiedad',
            text: 'Los coeficientes de copropiedad no están debidamente registrados.',
            icon: 'warning',
            showConfirmButton: true,
            onClose: () => {
              this.formPoder.reset();
              this.router.navigate(['/secretary/inicio']);
            }
          });
        }
      }
    );
  }
}
