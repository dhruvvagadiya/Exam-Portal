import { Injectable } from '@angular/core';
import { CanActivate, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Router } from '@angular/router';
import { Role } from '../helpers/role.enum';

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (localStorage.getItem('isLoggedin') && localStorage.getItem('ROLE') === Role.ADMIN) {
        return true;
    }

    // not logged in so redirect to login page with the return url
    this.router.navigate(['/unauthorized']);
    return false;
  }
}