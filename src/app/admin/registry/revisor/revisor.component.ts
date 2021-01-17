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
  public formRevisor = new FormGroup({
    administrador: new FormGroup({
      email: new FormControl('', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    })
  });

  constructor(private phService: PropiedadHorizontalService,
              private router: Router) { }

  public ngOnInit(): void { }
// Una tabla revisor y una tabla secretario con todos los datos que los identifiquen
// como ciudadanos y el idPropiedad y en base a ellos iniciar sesión o permitir acciones.
  public registrarRevisor: void(){
    // this.phService.
  }

}

// Notas: -Añadir campo estado a moción, para saber si esa votación está activa o finalizada
// -En el endpoint "persona/list" se supoone que retorna la info:[persona y bien privado] (buscar en back si es así) con sólo el idPropiedad
// -Que PersonalApoyo tenga un campo estado, para poder habilitar/deshabilitar ese usuario si así es necesario
// El punto anterior puede no ser necesario si el admin puede cambiar sus contraseñas
// Esa tabla PersonalApoyo que esté relacionada con la tabla PropiedadHor para poder saber de qué PH son,
// aunque el admin cuando los cree envíe en el POST el idPropiedad.



// Definir hoy qué voy a hacer. Qué campos deben ir en la posible tabla PersonalApoyo
// y cómo se retornarán los valores que necesitan el revisor y secretario en base a su idPropiedad.

// Al igual que cómo va a votar el propietario dada su relación con bien privado
// y lo que debe y cómo debe guardar el administrador con respecto al registro de secretario y revisor.

// En el perfil del super-admin, encargarlo de actualizar los datos de bienes privado y personas con endpoint persona/list.
