import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

    token : any;
    constructor(private authService: AuthService) {        
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        this.token = this.authService.getUserToken();
        if(this.token) {
            const authReq = req.clone({
                headers : req.headers.set('Authorization', 'Bearer ' + this.token)
            });

            return next.handle(authReq);
        }
        return next.handle(req);
    }
}