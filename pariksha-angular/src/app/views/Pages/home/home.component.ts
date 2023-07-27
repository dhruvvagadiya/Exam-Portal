import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Role } from 'src/app/core/helpers/role.enum';
import { AuthService } from 'src/app/core/services/auth.service';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private userService: UserService, private authService : AuthService ,private router : Router) {}


  ngOnInit(): void {
    this.userService.getUserSubject().subscribe((data) => {
      if(data !== null){        
        if(this.authService.getUserRole() === Role.USER) this.router.navigateByUrl('/dashboard');
        else this.router.navigateByUrl('/admin/dashboard');
      }
    });
  }

}
