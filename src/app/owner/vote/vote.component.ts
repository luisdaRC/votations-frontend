import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-vote',
  templateUrl: './vote.component.html',
  styleUrls: ['./vote.component.scss']
})
export class VoteComponent implements OnInit { // Aquí es donde va a votar el propietario
  // Se le debe mostrar la moción y sus respectivas opciones

  constructor() { }

  ngOnInit(): void {
  }

}
