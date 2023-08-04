import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { toast } from 'src/app/core/helpers/swalHelp';
import { Question } from 'src/app/core/models/Question/question.model';
import { QuestionOptions } from 'src/app/core/models/QuestionOptions/question-options.model';
import { QuestionService } from 'src/app/core/services/question.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.scss']
})
export class QuestionsComponent implements OnInit {

  quizId! : number;
  questions : Question [] = [];

  constructor(private route : ActivatedRoute, private questionService : QuestionService, private router : Router) {}

  ngOnInit(): void {
    this.quizId = this.route.snapshot.params['quizId'];

    this.questionService.getQuestionsByQuizId(this.quizId).subscribe(data => {
      this.questions = data;
    },
    (err) => {
      toast.error.fire({title : err.error.message, timer : 1000})
    });
  }

  getAnswer(list : QuestionOptions [] ) {
    let answer = '';
    list.forEach(e => {
      if(e.isAnswer == 1) {
        answer = e.content;
      }
    })
    return answer;
  }

  deleteQuestion(questionId : number, index : number) {

    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {

        this.questionService.deleteQuestion(questionId).subscribe((result) => {
          Swal.fire(
            'Deleted!',
            'Question has been deleted.',
            'success'
          );

          this.questions.splice(index, 1);
        },
        err => {
          Swal.fire('Error!', 'Something went wrong!', 'error')
        });
      }
    })
  }

  editQuestion(question : Question) {
  }
}
