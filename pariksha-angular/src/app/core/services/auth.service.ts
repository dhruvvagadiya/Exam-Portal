import { Injectable } from '@angular/core';
import { JwtHelper } from '../helpers/jwt-helper';
import { User } from '../models/User/user.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({providedIn: 'root'})
export class AuthService {
    constructor(private jwtHelper: JwtHelper) { }
    
    login(token : string, role : string, callback : any) {
        localStorage.setItem('ROLE', role);
        localStorage.setItem('USERTOKEN', token);
        if (callback) {
            callback();
        }

    }
    logout(callback : any) {
        localStorage.removeItem('USERTOKEN');
        localStorage.removeItem('ROLE');

        if (callback) {
            callback();
        }
    }

    getUsernameFromToken() {
        var token = this.getUserToken();
        if(token) {
            let decoded = this.jwtHelper.decodeToken(token!);
            return decoded.sub;   
        }
    }

    getUserToken() {
        return localStorage.getItem('USERTOKEN');
    }

    getUserRole() {
        return localStorage.getItem('ROLE');
    }
}