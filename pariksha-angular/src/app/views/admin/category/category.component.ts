import { Component, OnInit, TemplateRef } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Category } from 'src/app/core/models/category/category.model';
import { CategoryService } from 'src/app/core/services/categories.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {

  categories : Category[] = [];
  selectedCategory! : Category;
  selectedCategoryIndex = -1;

  constructor(private categoryService: CategoryService, private modalService: NgbModal) {}

  ngOnInit(): void {
    this.categoryService.getCategories().subscribe(data => {
      this.categories = data;      
    })
  }


  saveCategory(category : Category) {
    this.categoryService.upsertCategory(category).subscribe(data => {
      if(this.selectedCategoryIndex === -1) {
        this.categories.push(data);
      }
      else {
        this.categories[this.selectedCategoryIndex] = data;
      }
    });
  }

  openModal(content : TemplateRef<any>, select : any, index: number) {

    this.selectedCategoryIndex = index;

    if(select) this.selectedCategory = {...select};
    else this.selectedCategory = {id : 0, name : '', description : ''}
    
		this.modalService.open(content, {centered : true}).result.then((result) => {      
    }).catch((res) => {});
	}

}
