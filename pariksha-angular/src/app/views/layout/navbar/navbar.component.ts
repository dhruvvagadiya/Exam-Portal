import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { toast } from 'src/app/core/helpers/swalHelp';
import { User } from 'src/app/core/models/User/user.model';
import { AuthService } from 'src/app/core/services/auth.service';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit{
  constructor(private userService: UserService, private authService : AuthService, private router : Router, private userrService : UserService){}

  user? : User;

  ngOnInit(): void {
    this.userService.getUserSubject().subscribe((data) => {
      if(data !== null){        
        this.user = data;
      }
      else {
        this.user = undefined;
      }
    });
  }

  logout() {
    this.authService.logout(()=> {
      toast.success.fire({
        title : "Logged out successfully",
        timer : 1000
      });

      setTimeout(() => {
        this.userService.logout();
        this.router.navigateByUrl('home');
      }, 1000);
    })
  }
}
