import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { timer } from 'rxjs';
import { toast } from 'src/app/core/helpers/swalHelp';
import { Quiz } from 'src/app/core/models/Quiz/quiz.model';
import { QuizList } from 'src/app/core/models/Quiz/quizList.model';
import { Category } from 'src/app/core/models/category/category.model';
import { CategoryService } from 'src/app/core/services/categories.service';
import { QuizService } from 'src/app/core/services/quiz.service';

@Component({
  selector: 'app-add-quiz',
  templateUrl: './add-quiz.component.html',
  styleUrls: ['./add-quiz.component.scss']
})
export class AddQuizComponent implements OnInit {


  createQuizForm! : FormGroup
  quiz! : QuizList
  categoryList : Category [] = [];


  constructor(private categoryService: CategoryService, private quizService : QuizService, private router : Router) {}
  
  ngOnInit(): void {

    this.categoryService.getCategories().subscribe(data => {
      this.categoryList = data;
    })

    this.quiz = {
      id : 0,
      title : '',
      description : '',
      category : {
        id : 0,
        name : '',
        description : ''
      },
      marksPerQuestion : 1,
      numberOfQuestions : 0,
      isActive : 0,
    }

    this.createQuizForm = new FormGroup(
      {
        title : new FormControl(this.quiz.title, [Validators.required]),
        description : new FormControl(this.quiz.description, [Validators.required]),
        category : new FormControl(this.quiz.category, [Validators.required]),
        marksPerQuestion : new FormControl(this.quiz.marksPerQuestion, [Validators.required])
      }
    );
  }


  save() {
    this.quizService.createQuiz(this.quiz).subscribe(data => {
      toast.success.fire({title : 'Success!', timer : 2000})
      this.router.navigate(['admin', 'quiz']);
    }, err => {
      toast.error.fire({title : 'Sone Error Occured', timer : 2000})
    })
  }
}
