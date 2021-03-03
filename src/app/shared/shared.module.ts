import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingComponent } from './loading/loading.component';
import { NavbarComponent } from './layout/navbar/navbar.component';
import { SidebarComponent } from './layout/sidebar/sidebar.component';
import { RouterModule } from '@angular/router';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { RemoveBlanckPipe } from '../pipes/remove-blanck.pipe';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CustomSidebarComponent } from './layout/custom-sidebar/custom-sidebar.component';


@NgModule({
  declarations: [
    LoadingComponent,
    NavbarComponent,
    SidebarComponent,
    RemoveBlanckPipe,
    CustomSidebarComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    CollapseModule.forRoot(),
    MatTooltipModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatCheckboxModule,
    MatSortModule,
    MatTableModule,
    MatInputModule,
    MatProgressSpinnerModule
  ],
  exports: [LoadingComponent, NavbarComponent, SidebarComponent]
})
export class SharedModule { }
