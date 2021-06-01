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

  public data: any;
  public myPieChart: HTMLElement;
  public showPieChart = false;
  public existeMocion = false;

  constructor(
    public userService: UserService,
    private phService: PropiedadHorizontalService) { }

  ngOnInit(): void {
    this.getExisteMocion();
    if (this.existeMocion) {
      this.phService.getLastVotation().subscribe(data => {
        this.data = data;
        this.setShowChart();
        this.setChart();
      });
    }
  }

  public getExisteMocion(): void{
    this.phService.getMocion().subscribe((data: any) => {
      this.existeMocion = data.existeMocion;
    });
  }

  public setChart(): void{
    const doughnut = document.getElementById('myPieChart');
    const objectPieChart = {
      type: 'doughnut',
      data: {
        labels: ['Asistentes', 'Ausentes'],
        datasets: [{
          data: [this.data.asistentes, this.data.ausentes],
          backgroundColor: [
            'cornflowerblue',
            'tomato'
          ]
        }]
      },
      options: {
        title: {
          display: true,
          text: 'ASISTENTES EN LA ASAMBLEA'
        }
      }
    };

    this.myPieChart = new Chart(doughnut, objectPieChart);
  }

  public setShowChart(): void {
    this.showPieChart = true;
    if (this.data.asistentes === 0){
      this.showPieChart = false;
    }
    this.quorum = this.data.quorum;
  }


}
