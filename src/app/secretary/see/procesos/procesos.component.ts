import { Component, OnInit } from '@angular/core';
import {UserService} from '../../../services/sgph/user.service';
import {PropiedadHorizontalService} from '../../../services/sgph/propiedad-horizontal.service';

@Component({
  selector: 'app-procesos',
  templateUrl: './procesos.component.html',
  styleUrls: ['./procesos.component.scss']
})
export class ProcesosComponent implements OnInit {

  public data: any;
  public existeMocion = false; // Mocion activa
  public displayedColumns: string[] = ['descripcion', 'coeficientes', 'numeroVotos'];

  constructor(
    public userService: UserService,
    private phService: PropiedadHorizontalService) { }

  ngOnInit(): void {
    this.getExisteMocion();
    if (!this.existeMocion) {
      this.phService.getAllVotationsRevisor().subscribe((data: any) => {
        this.data = data;
      });
    }
  }

  public getExisteMocion(): void{
    this.phService.getMocion().subscribe((data: any) => {
      this.existeMocion = data.existeMocion;
    });
  }

}
