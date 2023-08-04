import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environment/environment';
import { QuizList } from '../models/Quiz/quizList.model';

@Injectable({providedIn: 'root'})
export class QuizService {

    constructor(private http : HttpClient) { }

    private apiUrl = environment.apiUrl + '/quiz'

    createQuiz(quiz : QuizList) {
        return this.http.post(this.apiUrl, quiz);
    }
    
    getQuizByCategoryId (id : number) {        
        return this.http.get<QuizList []>(this.apiUrl + '/getByCategory', {
            params : new HttpParams().append('category', id)
        });
    }

    updateBasicQuizDetails(quizList : QuizList) {
        return this.http.post<QuizList>(this.apiUrl + '/update', quizList);
    }

    togglePublish (quizId : number) {
        return this.http.post(this.apiUrl + '/toggleStatus', null, {
            params : new HttpParams().append('quizId', quizId)
        })
    }
} 