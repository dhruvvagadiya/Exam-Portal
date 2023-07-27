import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Category } from 'src/app/core/models/category/category.model';
import { CategoryService } from 'src/app/core/services/categories.service';

@Component({
  selector: 'app-upsert-category',
  templateUrl: './upsert-category.component.html',
  styleUrls: ['./upsert-category.component.scss']
})
export class UpsertCategoryComponent implements OnInit {

  @Input() modal : any;
  @Input() category! : Category;
  @Output() onSave = new EventEmitter<Category>();


  ngOnInit(): void {
  }

  constructor(private categoryService: CategoryService) {}
}
