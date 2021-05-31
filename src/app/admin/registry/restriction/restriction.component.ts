import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import Swal from 'sweetalert2';
import {PropiedadHorizontalService} from '../../../services/sgph/propiedad-horizontal.service';
import {UserService} from '../../../services/sgph/user.service';

@Component({
  selector: 'app-restriction',
  templateUrl: './restriction.component.html',
  styleUrls: ['./restriction.component.scss']
})
export class RestrictionComponent implements OnInit {

  public formRestriccion = new FormGroup({
    restriccion: new FormGroup({
      tipo: new FormControl('', [Validators.required])
    })
  });

  // consejoValue: any = (document.getElementById('consejo') as HTMLInputElement).value;

  restricciones = {
    idPropiedadHorizontal: this.userService.getUsuario().idPropiedadHorizontal,
    consejo: false,
    admin: false,
    presupuesto: false,
    proposicionGeneral: false,
    comiteConvivencia: false,
    revisor: false
  };
  estado: any;

  constructor(private phService: PropiedadHorizontalService,
              public userService: UserService) { }

  ngOnInit(): void {
  }

  public consejoValue(event: Event): void{
    this.estado = event;
    this.restricciones.consejo = this.estado.target.checked;
  }

  public adminValue(event: Event): void{
    this.estado = event;
    this.restricciones.admin = this.estado.target.checked;
  }

  public comiteconvivenciaValue(event: Event): void{
    this.estado = event;
    this.restricciones.comiteConvivencia = this.estado.target.checked;
  }

  public revisorValue(event: Event): void{
    this.estado = event;
    this.restricciones.revisor = this.estado.target.checked;
  }

  public presupuestoValue(event: Event): void{
    this.estado = event;
    this.restricciones.presupuesto = this.estado.target.checked;
  }

  public proposicionGeneralValue(event: Event): void{
    this.estado = event;
    this.restricciones.proposicionGeneral = this.estado.target.checked;
  }

  public save(): void{
    if (!this.restricciones.consejo && !this.restricciones.admin){
      if (!this.restricciones.presupuesto && !this.restricciones.proposicionGeneral){
        if (!this.restricciones.comiteConvivencia && !this.restricciones.revisor) {
          Swal.fire({
            title: 'No hay datos seleccionados',
            text: 'Debe seleccionar al menos 1 restricción si desea registrar',
            icon: 'warning',
            showConfirmButton: true
          });
          return;
        }
      }
    }
    this.phService.postRestriccion(this.restricciones).subscribe((data: any) => {
        if (data === 0){
          Swal.fire({
            title: 'Registro exitoso!',
            text: 'Todas las restricciones han sido guardadas exitosamente.',
            icon: 'success',
            showConfirmButton: true
          });
        }else if (data === 1){
          Swal.fire({
            title: 'Registro exitoso!',
            text: 'Las restricciones seleccionadas han sido guardadas exitosamente.',
            icon: 'success',
            showConfirmButton: true
          });
        }else{
          Swal.fire({
            title: 'Ocurrió un error',
            text: 'No se pudieron guardar las restricciones. Comuníquese con el administrador del sistema',
            icon: 'warning',
            showConfirmButton: true
          });
        }
      }
    );
  }

}
