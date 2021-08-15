import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/sgph/user.service';
import { Router } from '@angular/router';
import { PropiedadHorizontalService } from '../../services/sgph/propiedad-horizontal.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss']
})
export class InicioComponent implements OnInit {

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
    console.log('Implementar feature', idMocion);
    this.router.navigate(['/revisor/mociones/' + idMocion + '/detalle']);
  }



}
