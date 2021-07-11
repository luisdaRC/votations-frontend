import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js';
import { UserService } from '../../services/sgph/user.service';
import { PropiedadHorizontalService } from '../../services/sgph/propiedad-horizontal.service';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss']
})
export class InicioComponent implements OnInit {

  public data: any;

  constructor(
    public userService: UserService,
    private phService: PropiedadHorizontalService) { }

  ngOnInit(): void {
    this.phService.getAllVotationsRevisor().subscribe((data: any) => {
      this.data = data;
    });
  }



}
