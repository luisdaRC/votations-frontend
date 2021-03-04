import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import { PropiedadHorizontalService } from '../../../services/sgph/propiedad-horizontal.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-process',
  templateUrl: './process.component.html',
  styleUrls: ['./process.component.scss']
})
export class ProcessComponent implements OnInit {

  public formProcess = new FormGroup({ // Está saliendo un error por aquí al momento de entrar a componente check/process
    fechaEvento: new FormControl('', [Validators.required])
  });

  displayedColumns = {
    mocion : ['Moción']
  };
  public dataSource;
  public existe = false;
  constructor(private phHorizontal: PropiedadHorizontalService) {}

  ngOnInit() {
  }

  consultar(){
    this.phHorizontal.getMocionesAsamblea(this.formProcess).subscribe((data: any) => {
      this.existe = true;
      this.dataSource = new MatTableDataSource(data); // Definir la manera en que se mostrará el listado de mociones de la asamblea consultada.
      });
  }

}

