import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss']
})
export class InicioComponent implements OnInit {

  constructor() { }

  ngOnInit(): void { // Empezar a llenar este componente y los demás de admin
    // y echar un vistazo a ver si ya sirve el login con los ajustes hechos a admin.routes
    // https://www.youtube.com/watch?v=Q1839NnaYMY terminar de ver cómo hace el vale el login
  }

}
