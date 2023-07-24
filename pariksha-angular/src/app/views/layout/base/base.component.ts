import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/core/models/User/user.model';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.scss']
})
export class BaseComponent implements OnInit{


  constructor(private userService: UserService) {}
  user? : User
  showSidebar : boolean = false;

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

}
