import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environment/environment';
import { Category } from '../models/category/category.model';

@Injectable({providedIn: 'root'})
export class CategoryService {
    constructor(private http : HttpClient) { }
    
    apiUrl = environment.apiUrl + '/categories'

    getCategories() {
        return this.http.get<Category []>(this.apiUrl);
    }
}