import { Component, OnInit } from '@angular/core';
import { SidebarService } from '../services/extras/sidebar.service';
import { AppService } from '../services/extras/app.service';

@Component({
  selector: 'app-revisor',
  templateUrl: './revisor.component.html',
  styleUrls: ['./revisor.component.scss']
})
export class RevisorComponent implements OnInit {

  constructor(
    public sideBarService: SidebarService,
    private appService: AppService
  ) { }

  ngOnInit(): void {
  }

  public getClasses() {
    const classes = {
      'pinned-sidebar': this.appService.getSidebarStat().isSidebarPinned,
      'toggeled-sidebar': this.appService.getSidebarStat().isSidebarToggeled
    };
    return classes;
  }

  public toggleSidebar() {
    this.appService.toggleSidebar();
  }
}
