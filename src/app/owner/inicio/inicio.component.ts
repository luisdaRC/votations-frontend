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
    console.log(this.data);
    console.dir(this.data);
    //this.existeMocion = this.data.mocionActiva;
  }

  public getMociones(): void{
    this.phService.getMocionPropietario().subscribe((data: any) => {
      // Assign data from back and play with mocionActiva and estado/opciones
      console.log(data);
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
          Swal.fire({
            title: 'Proposición votada correctamente',
            text: 'Su elección se guardó en el sistema.',
            icon: 'success',
            showConfirmButton: true
          });
        });
      }
    });
  }

}
