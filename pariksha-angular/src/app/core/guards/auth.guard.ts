import { Injectable } from '@angular/core';
import { CanActivate, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Router } from '@angular/router';
import { JwtHelper } from '../helpers/jwt-helper';
import Swal from 'sweetalert2'


@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private jwtHelper: JwtHelper) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const token = localStorage.getItem('USERTOKEN');
    const roles = localStorage.getItem('ROLE');


    if (token && roles) {
      // logged in so return true
      let decoded = this.jwtHelper.decodeToken(token);
      if(decoded.sub && decoded.exp >= Date.now() / 1000) {

        //now check if user has required roles
        const reqRoles : string[] = route.data['role'];

        let isAuthenticated = false;
        reqRoles.forEach((role) => {
          if(roles.includes(role)) {
            isAuthenticated = true;
          }
        });

        if(isAuthenticated) return true;
      }
    }

    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'You don\'t have access to this page!',
      confirmButtonColor:'#314731',
      confirmButtonText:'Back to Home'
    }).then(() => {
      this.router.navigate(['home']);
    });

    return false;
  }
}