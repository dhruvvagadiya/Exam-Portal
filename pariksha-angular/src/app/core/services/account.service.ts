import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environment/environment';
import { LoginModel } from '../models/User/login.model';

@Injectable({providedIn: 'root'})
export class AccountService {

    constructor(private http : HttpClient) { }
    
    login(loginModel : LoginModel) {
        return this.http.post(environment.apiUrl + '/auth/login', loginModel);
    }

    register(registerModel : any){
        return this.http.post(environment.apiUrl + '/auth/signup', registerModel);
    }
}