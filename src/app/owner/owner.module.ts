// Modules
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OwnerRoutingModule } from './owner.routes';
import { SharedModule } from '../shared/shared.module';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

// Components
import { InicioComponent } from './inicio/inicio.component';
import { ProfileOwnerComponent } from './profile/profile.component';
import { VoteComponent } from './vote/vote.component';
import { OwnerComponent } from './owner.component';

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


@NgModule({
  declarations: [
    OwnerComponent, VoteComponent, InicioComponent, ProfileOwnerComponent],
  imports: [
    CommonModule,
    RouterModule,
    MatStepperModule,
    FormsModule,
    ReactiveFormsModule,
    MatSlideToggleModule,
    MatCardModule,
    MatGridListModule, // Si están en angular
    OwnerRoutingModule,
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
export class OwnerModule { }
