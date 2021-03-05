import { Component, OnInit } from '@angular/core';
import {Propietario} from '../../models/Propietario.interface';

@Component({
  selector: 'app-listar-asistentes',
  templateUrl: './listar-asistentes.component.html',
  styleUrls: ['./listar-asistentes.component.scss']
})
export class ListarAsistentesComponent implements OnInit {

  constructor() { }

  displayedColumns: string[] = ['nombres', 'apellidos', 'Numero Documento', 'Tipo Documento'];

  lista: Propietario [] = [
    {nombres: 'Prop1', apellidos: 'Bien1', numeroDocumento: '1', tipoDocumento: 'CC'},
    {nombres: 'Prop2', apellidos: 'Bien2', numeroDocumento: '2', tipoDocumento: 'CC'},
    {nombres: 'Prop3', apellidos: 'Bien3', numeroDocumento: '3', tipoDocumento: 'CC'},
    {nombres: 'Prop4', apellidos: 'Bien4', numeroDocumento: '4', tipoDocumento: 'CC'}
  ];
// https://www.youtube.com/watch?v=BBV60m2qTMo
// https://material.angular.io/components/checkbox/overview
// Documentación chévere: https://desarrolloweb.com/articulos/trabajando-campos-checkbox-angularjs.htm
// Selecting the whole row: https://www.youtube.com/watch?v=sETEuELRwnM
  ngOnInit(): void {
  }

}
