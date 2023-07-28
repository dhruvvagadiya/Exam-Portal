import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { QuizList } from 'src/app/core/models/Quiz/quizList.model';
import { Category } from 'src/app/core/models/category/category.model';
import { CategoryService } from 'src/app/core/services/categories.service';

@Component({
  selector: 'app-update-quiz',
  templateUrl: './update-quiz.component.html',
  styleUrls: ['./update-quiz.component.scss']
})
export class UpdateQuizComponent implements OnInit {

  @Input() modal : any;
  @Input() quiz! : QuizList;
  @Output() onSave = new EventEmitter<QuizList>();
  @Input() categoryList : Category[] = []

  constructor() {}

  updateQuizform! : FormGroup
 
  ngOnInit(): void {
    this.updateQuizform = new FormGroup(
      {
        title : new FormControl(this.quiz.title, [Validators.required]),
        description : new FormControl(this.quiz.description, [Validators.required]),
        category : new FormControl(this.quiz.category, [Validators.required]),
        marksPerQuestion : new FormControl(this.quiz.marksPerQuestion, [Validators.required])
      }
    );
  }

  compareCategories(category1: Category, category2: Category): boolean {
    return category1 && category2 ? category1.id === category2.id : category1 === category2;
  }

  save() {
    this.onSave.emit(this.quiz);
  }
}
