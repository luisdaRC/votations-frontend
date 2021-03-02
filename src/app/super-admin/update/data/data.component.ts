import { Component, OnInit } from '@angular/core';
import {UserService} from '../../../services/sgph/user.service';
import {PropiedadHorizontalService} from '../../../services/sgph/propiedad-horizontal.service';
import {Router} from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.scss']
})
export class DataComponent implements OnInit {

  public persona: any;

  constructor(
    public userService: UserService,
    private phService: PropiedadHorizontalService,
    private router: Router) { }

  ngOnInit(): void {
  }

  public actualizar() {
    // Hace get a persona/list y luego post a propiedad-horizontal/update
    this.phService.getPersonaList().subscribe((data: any) => {
      this.persona = data;

      console.dir(this.persona);

      this.phService.postUpdate(this.persona).subscribe(data => {

        Swal.fire({
          title: ' ¡Actualización Exitosa!',
          text: 'Los datos de Personas y Bienes Privados han sido actualizada correctamente',
          icon: 'success',
          confirmButtonText: 'Listo',
          onClose: () => {
            this.router.navigate(['/super-admin']);
          }
        });
      });
    });
  }
}
