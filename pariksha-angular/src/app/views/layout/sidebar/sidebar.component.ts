import { Component, Input, OnInit } from '@angular/core';
import { Category } from 'src/app/core/models/category/category.model';
import { CategoryService } from 'src/app/core/services/categories.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  @Input() showSidebar : boolean = false
  showCategories : boolean = false;
  categories : Category [] = [];

  constructor(private categoryService : CategoryService) {}

  ngOnInit(): void {
    this.categoryService.getCategories().subscribe(data => {
      this.categories = data;
    });
  }
}
