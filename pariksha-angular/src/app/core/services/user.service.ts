import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from '../models/User/user.model';
import { HttpClient } from '@angular/common/http';

@Injectable({providedIn: 'root'})
export class UserService {
    constructor(private http : HttpClient) { }
    
    userSubject = new BehaviorSubject<User | null>(null);

    // getUserSubject(){
    //     return this.userSubject.asObservable();
    // }
}