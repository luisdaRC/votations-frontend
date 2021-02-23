import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss']
})

  // El inicio del propietario será un listado de asambleas realizadas  la asamblea en curso si la hay
export class InicioComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
