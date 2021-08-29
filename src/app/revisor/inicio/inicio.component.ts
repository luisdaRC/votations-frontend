import {Component, OnInit, ViewChild} from '@angular/core';
import { UserService } from '../../services/sgph/user.service';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { PropiedadHorizontalService } from '../../services/sgph/propiedad-horizontal.service';
import {MatSort} from '@angular/material/sort';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss']
})
export class InicioComponent implements OnInit {

  public displayedColumns: string[] = ['descripcion', 'coeficientes', 'numeroVotos'];
  public data: any;

  constructor(
    private router: Router,
    public userService: UserService,
    private phService: PropiedadHorizontalService) { }

  ngOnInit(): void {
    this.phService.getAllVotationsRevisor().subscribe((data: any) => {
      this.data = data;
    });
  }

  public detalles(idMocion: any): void {
    this.router.navigate(['/revisor/mociones/' + idMocion + '/detalle']);
  }



}
