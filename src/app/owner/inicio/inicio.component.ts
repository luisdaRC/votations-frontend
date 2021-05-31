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
  public data: any = {};

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
      this.data = data;
    });
  }

  public sendVote(voto: string): void{
    Swal.fire({
      title: '¿Seguro que desea votar por la proposición: ' + voto + '?',
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
          }
          else if (data === 0){
            Swal.fire({
              title: 'Consulte con su administrador',
              text: 'Hay una restricción que le impide votar.',
              icon: 'warning',
              showConfirmButton: true
            });
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
