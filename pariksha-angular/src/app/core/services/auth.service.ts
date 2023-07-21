import { Injectable } from '@angular/core';
import { JwtHelper } from '../helpers/jwt-helper';
import { User } from '../models/User/user.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({providedIn: 'root'})
export class AuthService {
    constructor(private jwtHelper: JwtHelper) { }
    
    login(token : string, role : string, callback : any) {
        localStorage.setItem('isLoggedin', 'true');
        localStorage.setItem('ROLE', role);
        localStorage.setItem('USERTOKEN', token);
        if (callback) {
            callback();
        }

    }
    logout(callback : any) {
        localStorage.removeItem('isLoggedin');
        localStorage.removeItem('USERTOKEN');
        localStorage.removeItem('ROLE');

        if (callback) {
            callback();
        }
    }

    getLoggedInUserInfo() : null {
        return null;
    }

    getUserToken() {
        return localStorage.getItem('USERTOKEN');
    }

    getUserRole() {
        return localStorage.getItem('ROLE');
    }
}