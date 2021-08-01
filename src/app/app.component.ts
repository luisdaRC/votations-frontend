import { Component, OnInit } from '@angular/core';
import { Router, RouteConfigLoadStart, RouteConfigLoadEnd } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'votations-frontend';
  private spinner: HTMLElement;
  constructor(private  router: Router){

  }

  ngOnInit() {
    this.loadingMainModule();
  }

  private loadingMainModule() {
    this.spinner = document.getElementById('app-loading');
    this.router.events.subscribe(event => {

      if (event instanceof RouteConfigLoadStart) {
        this.spinner.classList.add('d-block'); // Try stuff with it
        console.log('Cargando esta vuelta');
      } else if (event instanceof RouteConfigLoadEnd) {
        this.spinner.classList.remove('d-block');
        console.log('Deja de cargar esta vuelta');
      }
    });
  }
}
