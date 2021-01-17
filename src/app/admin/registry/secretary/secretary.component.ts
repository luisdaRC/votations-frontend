import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-secretary',
  templateUrl: './secretary.component.html',
  styleUrls: ['./secretary.component.scss']
})
export class SecretaryComponent implements OnInit {
// Que el control para que el secretario luego de acabada la asamblea no pueda seguir realizando acciones sea
// la fecha de finalización de la asamblea y se puede tener otra tabla que relacione los secretarios extrayendo
// datos del swagger del core -mediante número y tipo de documento- e insertarlos en dicha tabla en caso de que sea
// indispensable por cuestiones legales

  constructor() { }

  ngOnInit(): void {
  }

}
