import { Component, OnInit } from '@angular/core';
import { QuizList } from 'src/app/core/models/Quiz/quizList.model';
import { QuizService } from 'src/app/core/services/quiz.service';

@Component({
  selector: 'app-quizzes',
  templateUrl: './quizzes.component.html',
  styleUrls: ['./quizzes.component.scss']
})
export class QuizzesComponent implements OnInit {

  quizList : QuizList[] = [];
  filteredQuizzes : QuizList[] = [];
  
  page = 1;
	pageSize = 7;
	collectionSize = this.filteredQuizzes.length;


  constructor(private quizService : QuizService) {}

  ngOnInit(): void {
    this.quizService.getQuizByCategoryId(0).subscribe(data => {
      this.quizList = data;
      this.filteredQuizzes = data;
      this.collectionSize = this.filteredQuizzes.length;
      this.refreshCountries();
    })

    // this.quizService.getQuizByCategoryId(0);
  }

  refreshCountries() {
    this.filteredQuizzes = this.quizList;
    this.filteredQuizzes = this.filteredQuizzes.map((country, i) => ({ ...country })).slice(
			(this.page - 1) * this.pageSize,
			(this.page - 1) * this.pageSize + this.pageSize,
		);
  }
}
