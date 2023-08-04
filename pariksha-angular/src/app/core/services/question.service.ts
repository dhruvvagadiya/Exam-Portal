import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environment/environment';
import { Question } from '../models/Question/question.model';

@Injectable({providedIn: 'root'})
export class QuestionService {
    constructor(private http : HttpClient) { }

    private apiUrl : string = environment.apiUrl + '/question'

    getQuestionsByQuizId(quizId : number) {
        return this.http.get<Question []>(this.apiUrl, {
            params : new HttpParams().append('quizId', quizId)
        });
    }

    getQuestionById(questionId: number) {
        return this.http.get<Question>(this.apiUrl + '/' + questionId);
    }

    upsert(question : Question, quizId : number) {
        return this.http.post<Question>(this.apiUrl, question, {
            params : new HttpParams().append('quizId', quizId)
        });
    }

    deleteQuestion(questionID : number) {
        return this.http.delete(this.apiUrl, {
            params : new HttpParams().append('questionId', questionID)
        });
    }
}