import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js';
import { UserService } from '../../services/sgph/user.service';
import { PropiedadHorizontalService } from '../../services/sgph/propiedad-horizontal.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss']
})
export class InicioComponent implements OnInit {

  public data: any;
  public ph: any;
  public myPieChart: HTMLElement;
  public myBarChart: HTMLElement;
  public showPieChart = false;
  public showBars = false;
  public existePH = false;

  constructor(
    public userService: UserService,
    private phService: PropiedadHorizontalService,
    private router: Router) { }

  ngOnInit() {
    this.getExistePH();
    this.phService.getEstadisticas().subscribe(data => {
      this.data = data;
      this.setData();
      this.validateStats();
    });
  }

  public post(){
    this.phService.getListPh(this.userService.getIdPh()).subscribe((data: any) => {
      this.ph = data;
      this.phService.postPH(this.ph).subscribe(data => {// Have into account the href in start

        Swal.fire({
          title: ' ¡Actualización Exitosa!',
          text: 'La propiedad ha sido actualizada correctamente',
          icon: 'success',
          confirmButtonText: 'Listo',
          onClose: () => {
            this.router.navigate(['/super-admin']);
          }
        });
      });

    });

  }

  public getExistePH(){ // Si no existe se muestra el mensaje
    this.phService.getPH().subscribe((data: any) => {
      this.existePH = data.existePH;
    });
  }

  private setData(): void {

    const ctx2 = document.getElementById('myPieChart');
    const bar = document.getElementById('myBarChart');
    const objectPieChart = {
      type: 'doughnut',
      data: {
        labels: ['Residentes', 'Propietarios', 'Habitantes'],
        datasets: [{
          data: [this.data.numeroResidentes, this.data.numeroPropietarios, this.data.numeroHabitantes],
          backgroundColor: [
            'tomato',
            'cornflowerblue',
            'green',
          ]
        }]
      },
      options: {
        title: {
          display: true,
          text: 'PERSONAS EN LA PROPIEDAD HORIZONTAL'
        }
      }
    };
    const objectBarChart = {
      type: 'bar',
      data: {

        labels: ['Hombres', 'Mujeres', 'Otros'],
        datasets: [{
          label: '# Personas',
          data: [this.data.numeroGeneroMasculino, this.data.numeroGeneroFemenino, this.data.numeroGeneroOtro],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true,
              callback: function(value) { if (Number.isInteger(value)) { return value; } },
              stepSize: 1
            }
          }]
        },
        title: {
          display: true,
          text: 'HABITANTES POR GÉNERO'
        }
      }
    };

    this.myPieChart = new Chart(ctx2, objectPieChart);
    this.myBarChart = new Chart(bar, objectBarChart);
  }

  public validateStats(){
    this.data.numeroGeneroMasculino === 0 && this.data.numeroGeneroFemenino === 0
    && this.data.numeroGeneroOtro === 0  ?
      this.showBars = true : this.showBars = false;

    this.data.numeroResidentes === 0 && this.data.numeroHabitantes === 0
    && this.data.numeroPropietarios === 0  ?
      this.showPieChart = true : this.showPieChart = false;
  }

}
