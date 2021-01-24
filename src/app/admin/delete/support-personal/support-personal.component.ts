import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PropiedadHorizontalService } from '../../../services/sgph/propiedad-horizontal.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { UserService } from '../../../services/sgph/user.service';

@Component({
  selector: 'app-support-personal',
  templateUrl: './support-personal.component.html',
  styleUrls: ['./support-personal.component.scss']
})
export class SupportPersonalComponent implements OnInit {

  // Form
  public formPatchPersonal = new FormGroup({
    pApoyo: new FormGroup({
      tipoDocumento: new FormControl('', [Validators.required]),
      numeroDocumento: new FormControl('', [Validators.required]),
      rol: new FormControl('', [Validators.required])
    })
  });

  constructor(private phService: PropiedadHorizontalService,
              private router: Router,
              public userService: UserService) { }
// Desplegar campos para que se seleccione si se quiere "eliminar" (update a estado de ese user) un secretario o un revisor,
// lo mismo para CC, CE, etc y un campo para número de documento
  ngOnInit(): void {
  }

  public patchPersonal(): void{
    const personalApoyo = Object.assign(this.formPatchPersonal.value.pApoyo);

    const personal = {
      personalApoyo,
      idPropiedadHorizontal: this.userService.getUsuario().idPropiedadHorizontal
    };

    this.phService.patchPersonalApoyo(personal).subscribe(
      (data: any) => {

        Swal.fire({
          title: ' ¡Registro Exitoso!',
          text: data.rol + ' eliminado. Cree uno nuevo para realizar funciones de la asamblea',
          icon: 'success',
          showConfirmButton: true,
          onClose: () => {
            this.formPatchPersonal.reset();
            this.router.navigate(['/admin']);
          }
        });

      }
    );

  }

}
