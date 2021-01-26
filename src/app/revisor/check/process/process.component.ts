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

  public formProcess = new FormGroup({
    fechaEvento: new FormControl('', [])
  });

  displayedColumns = {
    mocion : ['Moción']
  };
  public dataSource;
  constructor(private phHorizontal: PropiedadHorizontalService) {}

  ngOnInit() {
  }

  consultar(){
    this.phHorizontal.getMocionesAsamblea(this.formProcess).subscribe((data:any) => {
      this.dataSource = new MatTableDataSource(data);
      });
  }

}

