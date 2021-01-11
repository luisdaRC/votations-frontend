import { Component, OnInit } from '@angular/core';
import { SidebarService } from '../services/extras/sidebar.service';
import { AppService } from '../services/extras/app.service';

@Component({
  selector: 'app-admin', // TAKE A LOOK AT THIS IF I DONT FIND ANY OTHER REASON WHY THE START COMPONENT DOESN'T SERVE
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  constructor(
    public sideBarService: SidebarService,
    private appService: AppService
  ) { }

  ngOnInit() {
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
