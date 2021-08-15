import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { UserService } from '../../../services/sgph/user.service';
import { PropiedadHorizontalService } from '../../../services/sgph/propiedad-horizontal.service';
import { MatTableDataSource } from '@angular/material/table';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-listar-asistentes',
  templateUrl: './listar-asistentes.component.html',
  styleUrls: ['./listar-asistentes.component.scss']
})
export class ListarAsistentesComponent implements OnInit {

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
        this.getAsistentes();
      }else if (data === 0){
        this.asambleaActiva = false;
      }
    });
  }

  private getAsistentes(): void {
    this.phService.getAllAsistentes().subscribe((data: any) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sort = this.sort;
    });
  }

  public applyFilter(filterValue: string): void {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  public registrarAbandono(idPropietario: number): void{
    const abandonaAsamblea = {
      idPersona: idPropietario,
      idPropiedadHorizontal: this.userService.getUsuarioControl().idPropiedadHorizontal
    };

    Swal.fire({
      title: '¿Seguro que este propietario abandonó la asamblea?',
      icon: 'warning',
      showCancelButton: true,
      cancelButtonColor: '#d33',
      confirmButtonText: `Si`,
      cancelButtonText: 'Cancelar'
    }).then((result) => {

      if (result.isConfirmed){
        this.phService.postAsistenteAbandona(abandonaAsamblea).subscribe(data => {
          Swal.fire({
            title: 'Propietario removido de la asamblea',
            text: 'El propietario ha sido removido de la lista de asistentes de la asamblea.',
            icon: 'success',
            showConfirmButton: true
          });
        });
      }
    });
  }

  public terminarAsamblea(): void{
    Swal.fire({
      title: '¿Seguro que quiere terminar la asamblea?',
      icon: 'warning',
      showCancelButton: true,
      cancelButtonColor: '#d33',
      confirmButtonText: `Si`,
      cancelButtonText: 'Cancelar'
    }).then((result) => {

      if (result.isConfirmed){
        this.phService.getTerminarAsamblea().subscribe(data => {
          if (data === 1){
            Swal.fire({
              title: 'Asamblea finalizada',
              text: 'La asamblea ha sido marcada como finalizada exitosamente.',
              icon: 'success',
              showConfirmButton: true
            });
          } else if (data === 0){
            Swal.fire({
              title: 'Asamblea finalizada',
              text: 'Asamblea ya ha sido finalizada previamente.',
              icon: 'warning',
              showConfirmButton: true
            });
          }
        });
      }
    });

  }

}
