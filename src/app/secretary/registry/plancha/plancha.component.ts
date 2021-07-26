import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTable} from '@angular/material/table';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {PropiedadHorizontalService} from '../../../services/sgph/propiedad-horizontal.service';
import {UserService} from '../../../services/sgph/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-plancha',
  templateUrl: './plancha.component.html',
  styleUrls: ['./plancha.component.scss']
})
export class PlanchaComponent implements OnInit {

  public displayedColumns: string[] = ['planchas', 'acciones'];
  @ViewChild(MatTable) table: MatTable<any> = null;
  public candidates: string[] = [];
  public planchas: string[] = [];
  public finalPlanchas: string[] = [];
  public plancha = '';
  public existeMocion = false;

  public formPlancha = new FormGroup({
    datos: new FormGroup({
      titulo: new FormControl('', [Validators.required]),
      tipo: new FormControl('', [Validators.required]),
      tipoDocumento: new FormControl('', [Validators.required]),
      numeroDocumento: new FormControl('', [Validators.required])
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

  public addCandidate(): void {

    const tipoDoc = Object.assign(this.formPlancha.value.datos.tipoDocumento);
    const numDoc = Object.assign(this.formPlancha.value.datos.numeroDocumento);

    if (tipoDoc.toString().length !== 0 || numDoc.toString().length !== 0) {
      const completeDocumento = {
        tipo: tipoDoc.toString(),
        numero: numDoc.toString()
      };

      this.phService.postVerificarCandidato(completeDocumento).subscribe(data => {
        if (data.id === 0) {
          Swal.fire({
            title: 'Revise los datos ingresados.',
            text: 'Los datos ingresados no corresponden a ningún propietario',
            icon: 'warning',
            showConfirmButton: true
          });
          return;
        } else if (data.id === 1) {
          Swal.fire({
            title: 'Este propietario es moroso.',
            text: '¿Desea registrarlo de igual manera?',
            icon: 'warning',
            showCancelButton: true,
            cancelButtonColor: '#d33',
            confirmButtonText: `Si`,
            cancelButtonText: 'No'
          }).then((result) => {
            if (result.isConfirmed) {
              const newCandidate = data.nombre;
              this.verifyCandidate(newCandidate);
            } else {
              return;
            }
          });
        } else if (data.id === 2) {
          const newCandidate = Object.assign(data.nombre);
          this.verifyCandidate(newCandidate);
          console.log('Dentro de id 2: ', newCandidate);
        } else {
          Swal.fire({
            title: 'Ha ocurrido un error al intentar verificar el candidato.',
            text: 'Comuníquese con el administrador del sistema',
            icon: 'warning',
            showConfirmButton: true
          });
        }
      });
    }

  }

  public verifyCandidate(newCandidate: any): void{
    console.log('Dentro de verify candidato: ', newCandidate);
    if (this.candidates.length === 0){
      this.candidates.push(newCandidate.toString());
      this.plancha = newCandidate.toString();
      this.planchas.push(this.plancha);
      try{
        this.table.renderRows();
      } catch (Exception){}
      return;

    } else {
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
      this.plancha += ', ' + newCandidate.toString();
      this.planchas.splice(this.planchas.length - 1, 1, this.plancha);

      console.log('Dentro, newCandidate ', newCandidate);
      console.log('Dentro, candidates ', this.candidates);
      try{
        this.table.renderRows();
      } catch (Exception){}
    }
  }

  public deletePlancha(element: any): void{

    Swal.fire({
      title: '¿Seguro que desea eliminar esta plancha?',
      icon: 'warning',
      showCancelButton: true,
      cancelButtonColor: '#d33',
      confirmButtonText: `Si`,
      cancelButtonText: 'No'
    }).then((result) => {

      if (result.isConfirmed){
        const index = this.planchas.indexOf(element.toString(), 0);
        if (index > -1) {
          this.planchas.splice(index, 1);
          this.table.renderRows();
        }
      }
    });
  }

  public registryPlancha(): void {
    if (this.formPlancha.value.datos.tipo === ''){
      Swal.fire({
        title: 'Tipo requerido.',
        text: 'Debe seleccionar el tipo de moción de la plancha a registrar',
        icon: 'warning',
        showConfirmButton: true
      });
      return;
    }

    if (this.candidates.length > 1){
      if ((this.candidates.length === 2 || this.candidates.length % 2 === 0) && this.formPlancha.value.datos.tipo === 'CONSEJO_ADMIN'){
        Swal.fire({
          title: 'Tenga en cuenta: ',
          text: 'Para registrar planchas a consejo de administración, se requiere un número impar de candidatos de 3 en adelante',
          icon: 'success',
          showConfirmButton: true
        });
        return;
      }

      this.candidates = [];
      Swal.fire({
        title: 'Plancha guardada.',
        text: 'La plancha se ha registrado exitosamente',
        icon: 'success',
        showConfirmButton: true
      });
      this.formPlancha.value.datos.numeroDocumento = '';
    }
  }

  public submitPlanchas(): void{

    // Como principio de perdón
    if (this.planchas.length < 2){
      Swal.fire({
        title: 'Cuidado!',
        text: 'El número de planchas a inscribir debe ser de mínimo 2.',
        icon: 'warning',
        showConfirmButton: true
      });
      return;
    }

    const title = Object.assign(this.formPlancha.value.datos.titulo);
    const tipoMocion = Object.assign(this.formPlancha.value.datos.tipo);

    if (title.toString().length === 0){
      Swal.fire({
        title: 'Cuidado!',
        text: 'El título de la moción no puede estar vacío.',
        icon: 'warning',
        showConfirmButton: true
      });
      return;
    }
    let i = 1;
    for (const planchita of this.planchas){
      this.finalPlanchas.push('Plancha ' + i + ': ' + planchita);
      i = i + 1;
    }

    const completePlanchas = {
      titulo: title.toString(),
      tipo: tipoMocion.toString(),
      proposiciones: this.finalPlanchas,
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
        this.phService.postRegisterProposition(completePlanchas).subscribe(data => {
          if (data === 1){
            Swal.fire({
              title: 'Planchas registradas correctamente',
              text: 'Las planchas están listas para ser votada',
              icon: 'success',
              showConfirmButton: true
            });
          } else if (data === 2) {
            Swal.fire({
              title: 'Moción transcurriendo',
              text: 'Hay una moción activa en este momento en la asamblea.',
              icon: 'warning',
              showConfirmButton: true
            });
          } else if (data === 3) {
            Swal.fire({
              title: 'Comuníquese con el administrador de la propiedad',
              text: 'Los coeficientes de copropiedad no están debidamente registrados.',
              icon: 'warning',
              showConfirmButton: true
            });
          }
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


  /*
  * Terminada la inscripción de planchas. Falta mostrarlas correctamente en secretario y propietarios
  * Hacer lo respectivo para mostrarlas.
  *
  * */






}
