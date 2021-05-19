import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js';
import {UserService} from '../../../services/sgph/user.service';
import {PropiedadHorizontalService} from '../../../services/sgph/propiedad-horizontal.service';

@Component({
  selector: 'app-control-quorum',
  templateUrl: './control-quorum.component.html',
  styleUrls: ['./control-quorum.component.scss']
})
export class ControlQuorumComponent implements OnInit {

  public data: any;
  public quorum: number;
  public myPieChart: HTMLElement;
  public showPieChart = false;

  constructor(
    public userService: UserService,
    private phService: PropiedadHorizontalService) { }

  ngOnInit(): void {
    this.phService.getQuorum().subscribe(data => {
      this.data = data;
      this.setShowChart();
      this.setChart();
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

  public actualizar(): void{
    this.ngOnInit();
  }
  /*
  * Meter los datos en services en un array y luego poner un dtoOut para que data sea un JSON.
  * data: Dict = {
  *   asistentes: number, (int)
  *   ausentes: number, (int)
  *   quorum: number (float)
  * }
  * When there is no assembly, then just keep the assistants and no assistants to 0
  * to avoid the issue with the chart.
  * */

}
