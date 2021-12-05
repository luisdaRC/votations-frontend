import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { UserService } from '../../services/sgph/user.service';
import { PropiedadHorizontalService } from '../../services/sgph/propiedad-horizontal.service';
import { MatTableDataSource } from '@angular/material/table';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss']
})
export class InicioComponent implements OnInit {

  public displayedColumns: string[] = ['nombres', 'apellido', 'tipoDocumento', 'numeroDocumento', 'acciones'];
  public dataSource: any;
  public asambleaActiva = false;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    public userService: UserService,
    private phService: PropiedadHorizontalService) { }

  public ngOnInit(): void {
    this.phService.asambleaActiva().subscribe((data: any) => {
      if (data === 1){
        this.asambleaActiva = true;
        this.getPropietarios();
      }else if (data === 0){
        this.asambleaActiva = false;
      }
    });
  }

  private getPropietarios(): void {
    this.phService.getAllPropietarios().subscribe((data: any) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sort = this.sort;
    });
  }

  public applyFilter(filterValue: string): void {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  public agregarAsistente(idPropietario: number): void{
    const asistente = {
      idPersona: idPropietario,
      idPropiedadHorizontal: this.userService.getUsuarioControl().idPropiedadHorizontal
    };

    Swal.fire({
      title: '¿Seguro que quieres registrar a este propietario como asistente?',
      icon: 'warning',
      showCancelButton: true,
      cancelButtonColor: '#d33',
      confirmButtonText: `Registrar`,
      cancelButtonText: 'Cancelar'
    }).then((result) => {

      if (result.isConfirmed){
        this.phService.postAgregarAsistente(asistente).subscribe(data => {
          if (data === 1){
            Swal.fire({
              title: 'Propietario reingresado a la asamblea!',
              text: 'El propietario ha sido reingresado a la lista de asistentes de la asamblea',
              icon: 'success',
              showConfirmButton: true
            });
            this.ngOnInit();
          } else if (data === 2){
            Swal.fire({
              title: 'Propietario Registrado!',
              text: 'El propietario ha sido agregado a la lista de asistentes de la asamblea',
              icon: 'success',
              showConfirmButton: true
            });
            this.ngOnInit();
          } else if (data === 3){
            Swal.fire({
              title: 'Cuidado!',
              text: 'No hay asamblea transcurriendo en este momento',
              icon: 'warning',
              showConfirmButton: true
            });
          } else if (data === 4){
            Swal.fire({
              title: 'Hay un delegado registrado!',
              text: 'El propietario esta siendo representado por un delegado',
              icon: 'warning',
              showConfirmButton: true
            });
          } else if (data === 5){
            Swal.fire({
              title: 'Los coeficientes de copropiedad no están registrados correctamente.',
              text: 'Es necesario que su administrador registre todos los coeficientes de los propietarios de manera que sumen 100%',
              icon: 'warning',
              showConfirmButton: true
            });
          }
        });
      }
    });
  }

}
