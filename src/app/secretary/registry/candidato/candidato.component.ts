import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTable} from '@angular/material/table';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {PropiedadHorizontalService} from '../../../services/sgph/propiedad-horizontal.service';
import {UserService} from '../../../services/sgph/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-candidato',
  templateUrl: './candidato.component.html',
  styleUrls: ['./candidato.component.scss']
})
export class CandidatoComponent implements OnInit {

  public displayedColumns: string[] = ['candidatos', 'acciones'];
  // Ir ahora por la edición del html.

  // Para hoy terminar separación de props y candidatos.
  // INventar algo para votació en planchas y terminar de mostrar resultados en propietario.
  // Hacer comprobación de requisitos de candidatos y publicación de los definitivos.

  @ViewChild(MatTable) table: MatTable<any> = null;
  public candidates: string[] = [];
  public existeMocion = false;
  public selected: any;

  // Form
  public formCandidato = new FormGroup({
    datos: new FormGroup({
      titulo: new FormControl('', [Validators.required]),
      tipo: new FormControl('', [Validators.required]),
      candidato: new FormControl('', [Validators.required])
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

  public tipoValue(event: Event): void{
    console.log('What`s inside? ', event);
    // Sirveeeeeeeeeeeeee. Terminar validación de si es elección de consejo o comité...
    // Mejor añadir el tipo y número de documento en el form para enviar al back y verificar
    // validez de postulación para todos los tipos de moción.
  }

  public addCandidate(): void{
    const newCandidate = Object.assign(this.formCandidato.value.datos.candidato);

    if (newCandidate.length > 0 && this.candidates.length === 0){
      this.candidates.push(newCandidate.toString());
      try{
        this.table.renderRows();
      } catch (Exception){}
      return;
    }

    if (newCandidate.length > 0){
      const propTrimed = newCandidate.toString().trim().toLowerCase();
      for (const item of this.candidates) {
        console.log(item.trim().toLowerCase());
        console.log(propTrimed);
        if (item.trim().toLowerCase() === propTrimed){
          Swal.fire({
            title: 'Cuidado.',
            text: 'El candidato ingresado ya está registrado',
            icon: 'warning',
            showConfirmButton: true
          });
          return;
        }
      }
      this.candidates.push(newCandidate.toString());
      console.log('Dentro, newCandidate ', newCandidate);
      console.log('Dentro, candidates ', this.candidates);
      try{
        this.table.renderRows();
      } catch (Exception){}
      this.formCandidato.value.datos.candidato = '';
    }
  }

  public deleteCandidate(element: any): void{

    Swal.fire({
      title: '¿Seguro que desea registrar este candiato en la moción?',
      icon: 'warning',
      showCancelButton: true,
      cancelButtonColor: '#d33',
      confirmButtonText: `Si`,
      cancelButtonText: 'Cancelar'
    }).then((result) => {

      if (result.isConfirmed){
        const index = this.candidates.indexOf(element.toString(), 0);
        if (index > -1) {
          this.candidates.splice(index, 1);
          this.table.renderRows();
        }
      }
    });
  }

  public submitMocion(): void{

    // Como principio de perdón
    if (this.candidates.length < 2){
      Swal.fire({
        title: 'Cuidado!',
        text: 'El número de candidatos a inscribir debe ser de mínimo 2.',
        icon: 'warning',
        showConfirmButton: true
      });
      return;
    }

    const title = Object.assign(this.formCandidato.value.datos.titulo);
    const tipoMocion = Object.assign(this.formCandidato.value.datos.tipo);

    if (tipoMocion.toString() === 'CONSEJO_ADMIN' && this.candidates.length < 3){
      Swal.fire({
        title: 'Revise el número de candidatos inscritos!',
        text: 'Los candidatos para consejo de administración deben ser nínimo 3.',
        icon: 'warning',
        showConfirmButton: true
      });
    }
// Afinar consejo de admin para recibir por planchas. IMPORTANTE. Mejor crear otro component, qué piensas? Yes.

    if (title.toString().length === 0){
      Swal.fire({
        title: 'Cuidado!',
        text: 'El título de la moción no puede estar vacío.',
        icon: 'warning',
        showConfirmButton: true
      });
      return;
    }

    const completeCandidate = {
      titulo: title.toString(),
      tipo: tipoMocion.toString(),
      proposiciones: this.candidates,
      idPropiedadHorizontal: this.userService.getUsuarioControl().idPropiedadHorizontal
    };

    Swal.fire({
      title: '¿Seguro que desea registrar este candidato en la moción?',
      icon: 'warning',
      showCancelButton: true,
      cancelButtonColor: '#d33',
      confirmButtonText: `Si`,
      cancelButtonText: 'Cancelar'
    }).then((result) => {

      if (result.isConfirmed){
        this.phService.postRegisterProposition(completeCandidate).subscribe(data => {
          Swal.fire({
            title: 'Moción registrado correctamente',
            text: 'La moción está lista para ser votada',
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
              text: 'El registro de votaciones ha sido detenido. Ahora puede inscribir nuevos candidatos',
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
