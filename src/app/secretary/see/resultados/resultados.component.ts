import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js';
import {UserService} from '../../../services/sgph/user.service';
import {PropiedadHorizontalService} from '../../../services/sgph/propiedad-horizontal.service';

@Component({
  selector: 'app-resultados',
  templateUrl: './resultados.component.html',
  styleUrls: ['./resultados.component.scss']
})
export class ResultadosComponent implements OnInit {
  // Falta tomarlos y mostrarlos aquí. VAMOOOOOOOOOOOOOOOOOOOO HPTAAAAAA!!!


  public data: any;
  public coeficientesChart: HTMLElement;
  public votosPersonaChart: HTMLElement;
  public existeMocion = false;
  // azul, rojo, verde, amarillo, rosado, cian, gris, naranja, azul oscuro.
  public colors = ['rgba(0, 128, 255, 1)', 'rgba(255, 51, 51, 1)', 'rgb(60, 179, 113)', 'rgb(255, 165, 0)',
    'rgba(255, 153, 204, 1)', 'rgba(0, 255, 255, 1)', 'rgba(160, 159, 158, 1)',
    'rgba(255, 155, 50, 1)', 'rgba(0, 0, 167, 0.5)'];

  constructor(
    public userService: UserService,
    private phService: PropiedadHorizontalService) { }

  ngOnInit(): void {
    this.getExisteMocion();
    if (!this.existeMocion) {
      this.phService.getLastVotation().subscribe(data => {
        this.data = data;
        this.setCoeficientesChart();
        this.setVotosPersonaChart();
      });
    }
  }

  public getExisteMocion(): void{
    this.phService.getMocion().subscribe((data: any) => {
      this.existeMocion = data.existeMocion;
    });
  }

  public getColorList(numColors: number): string[]{
    const toReturn = [];
    let cont = 0;
    for (const color of this.colors) {
      if (cont + 1 > numColors){
        return toReturn;
      }
      toReturn.push(color);
      cont++;
    }
  }

  public setVotosPersonaChart(): void{
    const numColors = this.data.descripciones.length;
    const colorList = this.getColorList(numColors);
    const doughnut = document.getElementById('votosPersonaChart');
    const objectPieChart = {
      type: 'doughnut',
      data: {
        labels: this.data.descripciones,
        datasets: [{
          data: this.data.votosPorOpcion,
          backgroundColor: colorList
        }]
      },
      options: {
        title: {
          display: true,
          text: 'VOTOS POR PERSONA'
        }
      }
    };

    this.votosPersonaChart = new Chart(doughnut, objectPieChart);
  }

  public setCoeficientesChart(): void{
    const numColors = this.data.descripciones.length;
    const colorList = this.getColorList(numColors);
    const doughnut = document.getElementById('coeficientesChart');
    const objectPieChart = {
      type: 'doughnut',
      data: {
        labels: this.data.descripciones,
        datasets: [{
          data: this.data.coeficientesPorOpcion,
          backgroundColor: colorList
        }]
      },
      options: {
        title: {
          display: true,
          text: '% COEFICIENTES POR OPCIÓN'
        }
      }
    };

    this.coeficientesChart = new Chart(doughnut, objectPieChart);
  }


}
