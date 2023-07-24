import { Component, Input, OnInit } from '@angular/core';
import { menu } from './menu.list';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  @Input() showSidebar : boolean = false
  menu : any = [];

  ngOnInit(): void {
    this.menu = menu;
  }
}
