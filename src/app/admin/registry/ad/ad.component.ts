import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PropiedadHorizontalService } from '../../../services/sgph/propiedad-horizontal.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ad',
  templateUrl: './ad.component.html',
  styleUrls: ['./ad.component.scss']
})
export class AdComponent implements OnInit {

  public formAnuncio = new FormGroup({
    titulo: new FormControl('', [Validators.required]),
    tipo: new FormControl('', [Validators.required]),
    dirigido: new FormControl('', [Validators.required]),
    fechaEvento: new FormControl('', []),
    mensaje: new FormControl('', [Validators.required]),
    archivo: new FormControl('', []),
  });

  public fileName = '...';
  minDate: Date;

  constructor(private phHorizontal: PropiedadHorizontalService,
              private router: Router) {
/*    const currentDate = new Date().getMilliseconds(); https://material.angular.io/components/datepicker/overview#date-validation
    this.minDate = new Date(currentDate + 15 * 86400000);*/
  }

  public ngOnInit(): void {
  }

  public registrar(): void {
    this.phHorizontal.postAnuncio(this.formAnuncio.value).subscribe(data => {

      Swal.fire({
        title: ' ¡Registro Exitoso!',
        text: 'El anuncio ha sido registrado correctamente',
        icon: 'success',
        confirmButtonText: 'Listo',
        onClose: () => {
          this.formAnuncio.reset();
          this.router.navigate(['/admin']);
        }
      });
    });

  }

}
