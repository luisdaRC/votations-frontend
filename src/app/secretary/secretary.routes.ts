import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {SecretaryComponent} from './secretary.component';


import {InicioComponent} from './inicio/inicio.component';
import {ListarAsistentesComponent} from './see/lista-asistentes/listar-asistentes.component';
import {ControlQuorumComponent} from './see/control-quorum/control-quorum.component';
import {ProposicionComponent} from './registry/proposicion/proposicion.component';
import {ResultadosComponent} from './see/resultados/resultados.component';
import {CandidatoComponent} from './registry/candidato/candidato.component';
import {PlanchaComponent} from './registry/plancha/plancha.component';


const routes: Routes = [
  {
    path: '',
    component: SecretaryComponent,
    children: [
      {path: 'inicio', component: InicioComponent},
      {path: 'list/asistentes', component: ListarAsistentesComponent},
      {path: 'votations/quorum', component: ControlQuorumComponent},
      {path: 'votations/proposicion', component: ProposicionComponent},
      {path: 'votations/candidatos', component: CandidatoComponent},
      {path: 'votations/planchas', component: PlanchaComponent},
      {path: 'votations/resultados', component: ResultadosComponent},
      {path: '', redirectTo: 'inicio', pathMatch: 'full'}
    ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SecretaryRoutingModule { }
