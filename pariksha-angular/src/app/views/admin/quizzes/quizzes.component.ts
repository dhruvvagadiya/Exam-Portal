import { Component, OnInit, TemplateRef } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { toast } from 'src/app/core/helpers/swalHelp';
import { QuizList } from 'src/app/core/models/Quiz/quizList.model';
import { Category } from 'src/app/core/models/category/category.model';
import { CategoryService } from 'src/app/core/services/categories.service';
import { QuizService } from 'src/app/core/services/quiz.service';

@Component({
  selector: 'app-quizzes',
  templateUrl: './quizzes.component.html',
  styleUrls: ['./quizzes.component.scss']
})
export class QuizzesComponent implements OnInit {

  quizList : QuizList[] = [];
  filteredQuizzes : QuizList[] = [];
  categoryList : Category[] = [];

  selectedQuiz! : QuizList
  selectedIndex = -1;
  categoryFilterId = -1;
  
  page = 1;
	pageSize = 7;
	collectionSize = this.filteredQuizzes.length;


  constructor(private quizService : QuizService, private categoryService: CategoryService, private modalService : NgbModal) {}

  ngOnInit(): void {

    this.categoryService.getCategories().subscribe(data => {
      this.categoryList = data;
    })

    this.quizService.getQuizByCategoryId(0).subscribe(data => {
      this.quizList = data;
      this.filteredQuizzes = data;
      this.collectionSize = this.filteredQuizzes.length;
      this.refreshCountries();
    })
  }

  onCategoryChange(event: any) {
    this.categoryFilterId = +event.target.value;
    this.refreshCountries();
  }

  updateQuiz(event : QuizList) {

    this.quizService.updateBasicQuizDetails(event).subscribe(data => {
      this.filteredQuizzes[this.selectedIndex] = data;
      this.quizList.map((quiz) => {
        return quiz.id === data.id ? data : quiz;
      });
      
    }, err => {
      toast.error.fire({timer : 1500, title : err.message});
    });
  }

  openModal(editQuizModal : TemplateRef<any>, index: number) {

    this.selectedIndex = index;
    this.selectedQuiz = {...this.filteredQuizzes[index]};

    this.modalService.open(editQuizModal, {scrollable : true}).result.then(res => {}).catch(err => {})
  }

  refreshCountries() {

    if(this.categoryFilterId == -1) {
      this.filteredQuizzes = this.quizList;
	    this.collectionSize = this.filteredQuizzes.length;
    }
    else {
      this.filteredQuizzes = this.quizList.filter(e => e.category.id === this.categoryFilterId);
	    this.collectionSize = this.filteredQuizzes.length;
    }

    this.filteredQuizzes = this.filteredQuizzes.map((country, i) => ({ ...country })).slice(
			(this.page - 1) * this.pageSize,
			(this.page - 1) * this.pageSize + this.pageSize,
		);
  }
}
