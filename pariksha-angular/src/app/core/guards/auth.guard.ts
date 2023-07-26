import { Injectable } from '@angular/core';
import { CanActivate, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Router } from '@angular/router';
import { JwtHelper } from '../helpers/jwt-helper';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private jwtHelper: JwtHelper) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    let token = localStorage.getItem('USERTOKEN');

    if (token) {
      // logged in so return true
      let decoded = this.jwtHelper.decodeToken(token);
      if(decoded.sub && decoded.exp >= Date.now() / 1000) {
        return true;
      }
    }

    
    // not logged in so redirect to login page with the return url
    this.router.navigate(['/auth/login'], { queryParams: { returnUrl: state.url } });

    return false;
  }
}