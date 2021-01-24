import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  public isSidebarPinned = false;
  public isSidebarToggeled = false;

  constructor() { }

  public toggleSidebar(): void {
    this.isSidebarToggeled = !this.isSidebarToggeled;
  }

  public toggleSidebarPin(): void {
    this.isSidebarPinned = !this.isSidebarPinned;
  }

  public getSidebarStat() {
    return {
      isSidebarPinned: this.isSidebarPinned,
      isSidebarToggeled: this.isSidebarToggeled
    };
  }

}
