import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PropiedadHorizontalService } from '../../../services/sgph/propiedad-horizontal.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { UserService } from '../../../services/sgph/user.service';

@Component({
  selector: 'app-revisor',
  templateUrl: './revisor.component.html',
  styleUrls: ['./revisor.component.scss']
})
export class RevisorComponent implements OnInit {
// Crear componente sin mente utilizando el endpoint de signup de la misma manera en que
// en el core se crea el admin (con repecto a campos en el front).

  // Form
  public formRevisor = new FormGroup({ // Rol y estado se ponen fijos en el back
    revisor: new FormGroup({
      nombres: new FormControl('', [Validators.required]),
      apellido: new FormControl('', [Validators.required]),
      tipoDocumento: new FormControl('', [Validators.required]),
      numeroDocumento: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    })
  });

  // Attributes
  public existeRevisor = false;
// Decidí hacer un registro secretario y revisor separados, porque es más claro para el usuario saber lo que hará
  constructor(private phService: PropiedadHorizontalService,
              private router: Router,
              public userService: UserService) { }

  public ngOnInit(): void {
    this.getExisteRevisor();
  }
// Una tabla revisor y una tabla secretario con todos los datos que los identifiquen
// como ciudadanos y el idPropiedad y en base a ellos iniciar sesión o permitir acciones.

  public getExisteRevisor(){
    this.phService.getRevisor().subscribe((data: any) => {
      this.existeRevisor = data.existeRevisor;
    });
  }

  public registrarRevisor(): void{
    const revisorFiscal = Object.assign(this.formRevisor.value.revisor);

    const revisor = {
      revisorFiscal,
      idPropiedadHorizontal: this.userService.getUsuario().idPropiedadHorizontal
    };

    this.phService.postRevisor(revisor).subscribe(
      (data: any) => {

        Swal.fire({
          title: ' ¡Registro Exitoso!',
          text: 'El revisor ' + data.nombres + ' ya puede iniciar sesión con el email y contraseña ingresados',
          icon: 'success',
          showConfirmButton: true,
          onClose: () => {
            this.formRevisor.reset();
            this.router.navigate(['/admin']);
          }
        });

      }
    );

    }

}

// Notas: -Añadir campo estado a moción, para saber si esa votación está activa o finalizada
// -En el endpoint "persona/list" se supoone que retorna la info:[persona y bien privado] (buscar en back si es así) con sólo el idPropiedad
// -Que PersonalApoyo tenga un campo estado, para poder habilitar/deshabilitar ese usuario si así es necesario
// -El punto anterior puede no ser necesario si el admin puede cambiar sus contraseñas
// -Esa tabla PersonalApoyo que esté relacionada con la tabla PropiedadHor para poder saber de qué PH son,
// aunque el admin cuando los cree envíe en el POST el idPropiedad.
// -El secretario debe ser obligatriamente un propietario no se le puede dar este cargo a cualquier persona.
// que desde la interfaz del admin se tenga la opción de consultar si x persona es propietario por tipo y número de documento, si sí,
// se procede a registrar al secretario de esa asamblea.
// -La asamblea tiene que guardar el numero de documento del secretario por motivos de responsabilidad del transcurso de la misma.



// Definir hoy qué voy a hacer. Qué campos deben ir en la posible tabla PersonalApoyo
// y cómo se retornarán los valores que necesitan el revisor y secretario en base a su idPropiedad.

// Al igual que cómo va a votar el propietario dada su relación con bien privado
// y lo que debe y cómo debe guardar el administrador con respecto al registro de secretario y revisor.

// En el perfil del super-admin, encargarlo de actualizar los datos de bienes privado y personas con endpoint persona/list.
