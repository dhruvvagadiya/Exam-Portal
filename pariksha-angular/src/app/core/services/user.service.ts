import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from '../models/User/user.model';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'environment/environment';
import { AuthService } from './auth.service';

@Injectable({providedIn: 'root'})
export class UserService {
    constructor(private http : HttpClient, private authService : AuthService) { }
    
    apiUrl = environment.apiUrl + '/user';
    userSubject = new BehaviorSubject<User | null>(null);

    getUserSubject(){
        return this.userSubject.asObservable();
    }

    logout() {
        this.userSubject.next(null);
    }

    getCurrentUser(){
        let username = this.authService.getUsernameFromToken();
        this.getUserByUsername(username).subscribe((data : User) => {
            this.userSubject.next(data);
        });
    }

    getUserByUsername(username : string){ 
        return this.http.get<User>(this.apiUrl, {
            params : new HttpParams().append('username', username)
        });
    }
}