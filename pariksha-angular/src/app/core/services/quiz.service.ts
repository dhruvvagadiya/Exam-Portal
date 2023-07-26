import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environment/environment';
import { QuizList } from '../models/Quiz/quizList.model';

@Injectable({providedIn: 'root'})
export class QuizService {

    constructor(private http : HttpClient) { }

    apiUrl = environment.apiUrl + '/quiz'
    
    getQuizByCategoyId (id : number) {
        return this.http.get<QuizList []>(this.apiUrl + '/getbycategory', {
            params : new HttpParams().append('category', id)
        });
    }
} 