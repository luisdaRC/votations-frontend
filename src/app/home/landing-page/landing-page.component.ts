import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit {
// Este será el componente inicial, se mostrarán básicamente dos botones que dirigirán a logins (sec-revisor) y (admin-owner)
  constructor() { }

  ngOnInit(): void {
  }

}
