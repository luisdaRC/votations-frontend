import { Component, OnInit } from '@angular/core';
import {UserService} from '../../services/sgph/user.service';
import {PropiedadHorizontalService} from '../../services/sgph/propiedad-horizontal.service';
import {Router} from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss']
})

export class InicioComponent implements OnInit {

  public existeMocion = false;
  public esPlancha = false;
  public data: any = {};
  public numPlanchas: string[] = [];

  constructor(
    public userService: UserService,
    private phService: PropiedadHorizontalService,
    private router: Router) { }

  ngOnInit(): void {
    this.getMociones();
  }

  public getMociones(): void{
    this.phService.getMocionPropietario().subscribe((data: any) => {
      this.existeMocion = data.mocionActiva;
      this.esPlancha = data.esPlancha;
      this.data = data;
      if (this.esPlancha){
        for (const planchita of data.opciones) {
          const planchaNumero = planchita.split(':');
          this.numPlanchas.push(planchaNumero[0]);
        }
      }
    });
  }

  public sendVote(voto: string): void{
    Swal.fire({
      title: '¿Seguro que desea votar por la opción: ' + voto + '?',
      icon: 'warning',
      showCancelButton: true,
      cancelButtonColor: '#d33',
      confirmButtonText: `Si`,
      cancelButtonText: 'Cancelar'
    }).then((result) => {

      if (result.isConfirmed){
        const votoCompleto = {
          eleccion: voto.toString(),
          idPersona: this.userService.getUsuario().idPropietario
        };

        this.phService.postVotar(votoCompleto).subscribe(data => {
          if (data === 1){
            Swal.fire({
              title: 'Proposición votada correctamente',
              text: 'Su elección se guardó en el sistema.',
              icon: 'success',
              showConfirmButton: true
            });
            this.router.navigate(['owner/estadisticas']);
          }
          else if (data === 0){
            Swal.fire({
              title: 'Consulte con su administrador',
              text: 'Hay una restricción que le impide votar.',
              icon: 'warning',
              showConfirmButton: true
            });
          }
          else if (data === 3){
            Swal.fire({
              title: 'La proposición ya fue votada',
              text: 'El voto del propietario se encuentra guardado.',
              icon: 'warning',
              showConfirmButton: true
            });
            this.router.navigate(['owner/estadisticas']);
          }
          else{
            Swal.fire({
              title: 'Consulte con su admnistrador',
              text: 'Error al intentar registrar el voto.',
              icon: 'warning',
              showConfirmButton: true
            });
          }

        });
      }
    });
  }

  public sendVotePlancha(voto: string): void{
    Swal.fire({
      title: '¿Seguro que desea votar por la opción: ' + voto + '?',
      icon: 'warning',
      showCancelButton: true,
      cancelButtonColor: '#d33',
      confirmButtonText: `Si`,
      cancelButtonText: 'Cancelar'
    }).then((result) => {

      if (result.isConfirmed){
        let planchaCompleta = '';
        for (const planchita of this.data.opciones){
          if (planchita.startsWith(voto.toString())){
            planchaCompleta = planchita;
          }
        }
        const votoCompleto = {
          eleccion: planchaCompleta,
          idPersona: this.userService.getUsuario().idPropietario
        };

        this.phService.postVotar(votoCompleto).subscribe(data => {
          if (data === 1){
            Swal.fire({
              title: 'Proposición votada correctamente',
              text: 'Su elección se guardó en el sistema.',
              icon: 'success',
              showConfirmButton: true
            });
            this.router.navigate(['owner/estadisticas']);
          }
          else if (data === 0){
            Swal.fire({
              title: 'Consulte con su administrador',
              text: 'Hay una restricción que le impide votar.',
              icon: 'warning',
              showConfirmButton: true
            });
          }
          else if (data === 3){
            Swal.fire({
              title: 'La proposición ya fue votada',
              text: 'El voto del propietario se encuentra guardado.',
              icon: 'warning',
              showConfirmButton: true
            });
            this.router.navigate(['owner/estadisticas']);
          }
          else{
            Swal.fire({
              title: 'Consulte con su admnistrador',
              text: 'Error al intentar registrar el voto.',
              icon: 'warning',
              showConfirmButton: true
            });
          }

        });
      }
    });
  }

}
