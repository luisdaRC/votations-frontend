import { MatSort } from '@angular/material/sort';
import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from '../../services/sgph/user.service';
import { MatTableDataSource } from '@angular/material/table';
import {PropiedadHorizontalService} from '../../services/sgph/propiedad-horizontal.service';

@Component({
  selector: 'app-detalles',
  templateUrl: './detalles.component.html',
  styleUrls: ['./detalles.component.scss']
})
export class DetallesComponent implements OnInit {

  public displayedColumns: string[] = ['nombres', 'documento', 'eleccion', 'coeficiente', 'direccionIp'];
  public dataSource: any;
  public data: any;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private router: Router,
    public activatedRoute: ActivatedRoute,
    private phService: PropiedadHorizontalService) { }


  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.phService.getDetailedResultsRevisor(params.id).subscribe((data: any) => {
        this.dataSource = new MatTableDataSource(data.resultados);
        this.dataSource.sort = this.sort;
        this.data = data;
        console.log(data);
      });
    });
  }

}
