import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { toast } from 'src/app/core/helpers/swalHelp';
import { Question } from 'src/app/core/models/Question/question.model';
import { QuestionOptions } from 'src/app/core/models/QuestionOptions/question-options.model';
import { QuestionService } from 'src/app/core/services/question.service';

@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.scss']
})
export class AddQuestionComponent implements OnInit {

  questionId! : number
  quizId! : number
  question! : Question
  htmlContent : string = '';

  config: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: '8rem',
    minHeight: '5rem',
    minWidth : '100%',
    placeholder: 'Enter text here...',
    enableToolbar: false,
    translate: 'no',
    defaultParagraphSeparator: 'p',
    defaultFontName: 'Arial',
    toolbarHiddenButtons: [
      [
        'subscript',
        'superscript',
        'fontName'
      ],
      [
        'fontSize',
        'customClasses',
        'insertVideo',
        'removeFormat',
        'toggleEditorMode'
      ]
    ]
  };

  addQuestionForm! : FormGroup

  constructor(private route : ActivatedRoute, private questionService : QuestionService, private fb:FormBuilder, private router : Router) {}

  ngOnInit(): void {
    this.questionId = this.route.snapshot.params['questionId'];
    this.quizId = this.route.snapshot.params['quizId'];

    //question can have maximum 10 options
    this.addQuestionForm = this.fb.group({
      title : [null, [Validators.required]],
      questionOptions : this.fb.array([], [Validators.minLength(2), Validators.maxLength(10)])
    });


    if(this.questionId == 0) {
      this.question = {
        title : '',
        id : 0,
        questionOptionsList : [
          { id : 0, content : '', isAnswer : 0 },
          { id : 0, content : '', isAnswer : 0 },
          { id : 0, content : '', isAnswer : 0 },
          { id : 0, content : '', isAnswer : 0 }
        ]
      }

      this.question.questionOptionsList.forEach(option => {
        this.addOptionBuild();
      })
    }
    else {
      this.questionService.getQuestionById(this.questionId).subscribe(data => {
        this.question = data;

        this.question.questionOptionsList.forEach(option => {
          this.addOriginalOption(option);
        })
      });      
    }

  }

  onSubmit() : void {

    let cnt = 0;
    this.question.questionOptionsList.forEach(op => {
      if(op.isAnswer == 1) cnt++;
    })

    if(cnt !== 1) {
      toast.error.fire({title : 'Please select answer first!', timer : 2000});
      return;
    }

    this.questionService.upsert(this.question, this.quizId).subscribe(data => {

      if(this.question.id === 0) {
        toast.success.fire({title : 'Question Added Successfully.', timer: 2000});
        this.router.navigate(['admin', 'quiz', this.quizId]);
        return;
      }
      
      toast.success.fire({title : 'Success', timer: 2000});
      this.question = data;
    });
  }
  
  addOriginalOption(option : QuestionOptions) {
    const optionForm = this.fb.group({
      id : [option.id, Validators.required],
      content: [option.content, Validators.required],
      isAnswer : [option.isAnswer]
  });
  this.options.push(optionForm);
  }

  addOptionBuild() {
    const optionForm = this.fb.group({
        id : [0, Validators.required],
        content: ['', Validators.required],
        isAnswer : [0]
    });
    this.options.push(optionForm);
  }
  
  addOption() {
    
    if(this.options.valid) {

      if(this.options.length == 10) {
        toast.error.fire({title : 'Question can have maximum 10 options!', timer : 2000});
      }
      else {
        const optionForm = this.fb.group({
          id : [0, Validators.required],
          content: ['', Validators.required],
          isAnswer : [0]
        });
        this.options.push(optionForm);
        this.question.questionOptionsList.push({
          id : 0, content : '', isAnswer : 0
        });
      }
    }
    else {
      toast.error.fire({title : 'Please Fill All The Unused Options!', timer : 2000});
    }
  }

  get options() : FormArray {
    return this.addQuestionForm.controls["questionOptions"] as FormArray;
  }

  selectAnswer(i : number) {
    this.question.questionOptionsList.forEach(e => e.isAnswer = 0);
    this.question.questionOptionsList[i].isAnswer = 1;
  }

  deleteOption(index: number) {
    if(this.options.length > 2) {
      this.question.questionOptionsList.splice(index, 1);
      this.options.removeAt(index);
    }
    else {
      toast.error.fire({title : 'Minimum 2 options are required!', timer : 2000});
    }
  }
}
 