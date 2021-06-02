import { Component, OnInit, ViewChild } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {PropiedadHorizontalService} from '../../../services/sgph/propiedad-horizontal.service';
import {UserService} from '../../../services/sgph/user.service';
import { MatTable } from '@angular/material/table';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-proposicion',
  templateUrl: './proposicion.component.html',
  styleUrls: ['./proposicion.component.scss']
})
export class ProposicionComponent implements OnInit {

  public displayedColumns: string[] = ['proposiciones', 'acciones'];
  @ViewChild(MatTable) table: MatTable<any> = null;
  public propositions: string[] = [];
  public existeMocion = false;

  // Form
  public formProposicion = new FormGroup({
    datos: new FormGroup({
      titulo: new FormControl('', [Validators.required]),
      tipo: new FormControl('', [Validators.required]),
      proposicion: new FormControl('', [Validators.required])
    })
  });

  constructor(private phService: PropiedadHorizontalService,
              public userService: UserService) { }

  ngOnInit(): void {
    this.getExisteMocion();
  }

  public getExisteMocion(): void{
    this.phService.getMocion().subscribe((data: any) => {
      this.existeMocion = data.existeMocion;
    });
  }

  public addProposicion(): void{
    const newProp = Object.assign(this.formProposicion.value.datos.proposicion);

    if (newProp.length > 0 && this.propositions.length === 0){
      this.propositions.push(newProp.toString());
      try{
        this.table.renderRows();
      } catch (Exception){}
      return;
    }

    if (newProp.length > 0){
      const propTrimed = newProp.toString().trim().toLowerCase();
      for (const item of this.propositions) {
        console.log(item.trim().toLowerCase());
        console.log(propTrimed);
        if (item.trim().toLowerCase() === propTrimed){
          Swal.fire({
            title: 'Cuidado.',
            text: 'La proposición/candidato ingresado ya está registrado',
            icon: 'warning',
            showConfirmButton: true
          });
          return;
        }
      }
      this.propositions.push(newProp.toString());
      console.log('Dentro, newProposition ', newProp);
      console.log('Dentro, propositions ', this.propositions);
      try{
        this.table.renderRows();
      } catch (Exception){}
      this.formProposicion.value.datos.proposicion = '';
    }
  }

  public deleteProp(element: any): void{

    Swal.fire({
      title: '¿Seguro que desea registrar esta proposición en la asamblea?',
      icon: 'warning',
      showCancelButton: true,
      cancelButtonColor: '#d33',
      confirmButtonText: `Si`,
      cancelButtonText: 'Cancelar'
    }).then((result) => {

      if (result.isConfirmed){
        const index = this.propositions.indexOf(element.toString(), 0);
        if (index > -1) {
          this.propositions.splice(index, 1);
          this.table.renderRows();
        }
      }
    });
  }

  public submitProposicion(): void{

    // Agregar campo de tipo de moción (admin, consejo de admin, presupuesto, proposicion general)
    // al form para efectos de comparativa con la tabla restricción.


    // Como principio de perdón

    if (this.propositions.length < 2){
      Swal.fire({
        title: 'Cuidado!',
        text: 'El número de proposiciones o candidatos a inscribir debe ser de mínimo 2.',
        icon: 'warning',
        showConfirmButton: true
      });
      return;
    }

    const title = Object.assign(this.formProposicion.value.datos.titulo);
    const tipoMocion = Object.assign(this.formProposicion.value.datos.tipo);

    if (tipoMocion.toString() === 'CONSEJO_ADMIN' && this.propositions.length % 2 === 0){
      Swal.fire({
        title: 'Revise el número de candidatos inscritos!',
        text: 'Los candidatos para consejo de administración deben ser impares, 3 o más.',
        icon: 'warning',
        showConfirmButton: true
      });
    }
// Afinar consejo de admin para recibir por planchas. IMPORTANTE. Mejor crear otro component, qué piensas?

    if (title.toString().length === 0){
      Swal.fire({
        title: 'Cuidado!',
        text: 'El título de la proposición no puede estar vacío.',
        icon: 'warning',
        showConfirmButton: true
      });
      return;
    }

    const completeProposition = {
      titulo: title.toString(),
      tipo: tipoMocion.toString(),
      proposiciones: this.propositions,
      idPropiedadHorizontal: this.userService.getUsuarioControl().idPropiedadHorizontal
    };

    Swal.fire({
      title: '¿Seguro que desea registrar esta proposición en la asamblea?',
      icon: 'warning',
      showCancelButton: true,
      cancelButtonColor: '#d33',
      confirmButtonText: `Si`,
      cancelButtonText: 'Cancelar'
    }).then((result) => {

      if (result.isConfirmed){
        this.phService.postRegisterProposition(completeProposition).subscribe(data => {
          Swal.fire({
            title: 'Proposición registrada correctamente',
            text: 'El propietario ha sido removido de la lista de asistentes de la asamblea.',
            icon: 'success',
            showConfirmButton: true
          });
        });
      }
    });

  }

  public detenerVotaciones(): void{
    Swal.fire({
      title: '¿Seguro que desea detener el registro de las votaciones para la actual moción?',
      icon: 'warning',
      showCancelButton: true,
      cancelButtonColor: '#d33',
      confirmButtonText: `Si`,
      cancelButtonText: 'Cancelar'
    }).then((result) => {

      if (result.isConfirmed){
        this.phService.detenerVotaciones().subscribe(data => {
          if (data.result === 0){
            Swal.fire({
              title: 'No hay votos registrados',
              text: 'Debe haber más de 1 voto para poder terminar la votación',
              icon: 'warning',
              showConfirmButton: true
            });
            return;
          }else if (data.result === 1){
            Swal.fire({
              title: 'Votaciones detenidas',
              text: 'El registro de votaciones ha sido detenido. Ahora puede inscribir nuevas proposiciones',
              icon: 'success',
              showConfirmButton: true
            });
          }else{
            Swal.fire({
              title: 'Ocurrió un error',
              text: 'Contacte con su administrador.',
              icon: 'warning',
              showConfirmButton: true
            });
          }
        });
      }
    });
  }

}
