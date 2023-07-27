import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Route, Router } from '@angular/router';
import { QuizList } from 'src/app/core/models/Quiz/quizList.model';
import { QuizService } from 'src/app/core/services/quiz.service';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss']
})
export class QuizComponent implements OnInit {

  categoryId : number = 0;
  quizList : QuizList [] = []

  constructor(private route : ActivatedRoute, private quizService : QuizService) {}

  ngOnInit(): void {
    this.route.params.subscribe((data : Params) => {
      this.categoryId = data["id"];

      this.quizService.getQuizByCategoryId(this.categoryId).subscribe((data) => {
        this.quizList = data;
      });

    });
  }
}
