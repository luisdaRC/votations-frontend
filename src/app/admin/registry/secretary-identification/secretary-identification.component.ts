import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-secretary-identification',
  templateUrl: './secretary-identification.component.html',
  styleUrls: ['./secretary-identification.component.scss']
})
export class SecretaryIdentificationComponent implements OnInit {
// Se definirán campos de front para que se guarden tipo y número de identificación de un secretario para dada asamblea
// El Tipo-Número de identificación junto al idPersona se guardará en el back de nosotros y en una tabla que relacione asamblea-secretario.
  constructor() { }
// Indicar una semi alerta (como la del 1er inicio de sesion de estos manes) que los datos que se vayan a registrar
// corresponderán al del secretario de una dada asamblea o de la asamblea que está a punto de comenzar.
  ngOnInit(): void {
  }

}
