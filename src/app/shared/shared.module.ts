import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingComponent } from './loading/loading.component';
import { NavbarComponent } from './layout/navbar/navbar.component';
import { SidebarComponent } from './layout/sidebar/sidebar.component';
import { RouterModule } from '@angular/router';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
// import { MatOptionModule } from '@angular/material/option';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';


@NgModule({
  declarations: [
    LoadingComponent,
    NavbarComponent,
    SidebarComponent,
    LoadingComponent
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
 //   MatOptionModule,
    MatProgressSpinnerModule
  ],
  exports: [LoadingComponent, NavbarComponent, SidebarComponent]
})
export class SharedModule { }
