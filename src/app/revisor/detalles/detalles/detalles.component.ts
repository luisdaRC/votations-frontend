import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from '../../../services/sgph/user.service';
import {PropiedadHorizontalService} from '../../../services/sgph/propiedad-horizontal.service';

@Component({
  selector: 'app-detalles',
  templateUrl: './detalles.component.html',
  styleUrls: ['./detalles.component.scss']
})
export class DetallesComponent implements OnInit {

  constructor(
    private router: Router,
    public activatedRoute: ActivatedRoute,
    private phService: PropiedadHorizontalService) { }

    public idMocion: any;

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {/*
      this.phService.getDetailedResultsToRevisor(params.id).subscribe((loqueMandeDelBack: any) => {
        // Definir los datos que se van a mostrar y mostrarlos en una tabla. Eso se supone, es todo.
        // Mira cómo se manda y se usa en alguna tabla (asistentes, por ej.) y se hace lo same.
      });*/
      this.idMocion = params.id;
    });
  }

}
