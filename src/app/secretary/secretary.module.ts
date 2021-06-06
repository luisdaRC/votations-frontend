// Modules
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SecretaryRoutingModule } from './secretary.routes';
import { SharedModule } from '../shared/shared.module';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

// Components
import { InicioComponent } from './inicio/inicio.component';
import { SecretaryComponent } from './secretary.component';
import { ListarAsistentesComponent } from './see/lista-asistentes/listar-asistentes.component';

// Angular Material
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTableModule } from '@angular/material/table';
// import { MatOptionModule } from '@angular/material/option';
import { MatSelectModule } from '@angular/material/select';
import { MatSortModule } from '@angular/material/sort';
import { MatStepperModule } from '@angular/material/stepper';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTabsModule } from '@angular/material/tabs';

import { CollapseModule } from 'ngx-bootstrap/collapse';
import { ControlQuorumComponent } from './see/control-quorum/control-quorum.component';
import { ProposicionComponent } from './registry/proposicion/proposicion.component';
import { ResultadosComponent } from './see/resultados/resultados.component';
import { ProcesosComponent } from './see/procesos/procesos.component';
import { PoderesComponent } from './registry/poderes/poderes.component';
import { CandidatoComponent } from './registry/candidato/candidato.component';


@NgModule({
  declarations: [
    SecretaryComponent, InicioComponent, ListarAsistentesComponent, ControlQuorumComponent, ProposicionComponent, ResultadosComponent, ProcesosComponent, PoderesComponent, CandidatoComponent],
  imports: [
    CommonModule,
    RouterModule,
    MatStepperModule,
    FormsModule,
    ReactiveFormsModule,
    MatSlideToggleModule,
    MatCardModule,
    MatGridListModule,
    SecretaryRoutingModule,
    SharedModule,
    SweetAlert2Module,
    BsDropdownModule.forRoot(),
    CollapseModule.forRoot(),
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatPaginatorModule,
//    MatOptionModule,
    MatSelectModule,
    MatCheckboxModule,
    MatSortModule,
    MatTableModule,
    SharedModule,
    MatTabsModule,
    MatExpansionModule,
    MatSnackBarModule
  ]
})
export class SecretaryModule { }
