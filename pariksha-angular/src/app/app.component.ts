import { Component } from '@angular/core';
import { AuthService } from './core/services/auth.service';
import { UserService } from './core/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'pariksha-angular';

  constructor(private authService: AuthService, private userService : UserService, private router : Router){}

  ngOnInit(){
    var username = this.authService.getUsernameFromToken();
    if(username) {
      this.userService.getCurrentUser();
      this.router.navigate(['/dashboard']);
    }
    else {
      this.router.navigate(['/home']);
      
    }
  }
}
