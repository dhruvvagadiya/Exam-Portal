import { Component, Input, OnInit } from '@angular/core';
import { Role } from 'src/app/core/helpers/role.enum';
import { Category } from 'src/app/core/models/category/category.model';
import { AuthService } from 'src/app/core/services/auth.service';
import { CategoryService } from 'src/app/core/services/categories.service';
import { adminMenu } from './menu.list';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  @Input() showSidebar : boolean = false
  showCategories : boolean = false;
  isAdmin : boolean = false;

  categories : Category [] = [];
  adminMenu = adminMenu;

  constructor(private categoryService : CategoryService, private authService : AuthService) {}

  ngOnInit(): void {
    this.categoryService.getCategories().subscribe(data => {
      this.categories = data;
    });

    this.isAdmin = this.authService.getUserRole() === Role.ADMIN ? true : false;
  }
}
