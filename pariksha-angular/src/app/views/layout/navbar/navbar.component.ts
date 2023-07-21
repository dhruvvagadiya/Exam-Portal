import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/core/models/User/user.model';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit{
  constructor(private userService: UserService){}

  user! : User;

  ngOnInit(): void {
    this.userService.userSubject.subscribe((data) => {
      if(data !== null){
        this.user = data;
      }
    });
  }
}
