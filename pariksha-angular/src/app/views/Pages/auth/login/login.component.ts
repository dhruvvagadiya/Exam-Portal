import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { toast } from 'src/app/core/helpers/swalHelp';
import { usernameValidator } from 'src/app/core/helpers/validators';
import { LoginModel } from 'src/app/core/models/User/login.model';
import { AccountService } from 'src/app/core/services/account.service';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private fb: FormBuilder, private router : Router, private accountService : AccountService, private authService : AuthService) {}

  loginForm! : FormGroup;
  loginModel! : LoginModel;

  ngOnInit(): void {

    this.loginModel = {
      username: '',
      password: ''
    };

    this.loginForm = this.fb.group({
      username: ['', [Validators.required, usernameValidator()] ],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(30)]]
    });
  }

  onLogin(): void {
    this.accountService.login(this.loginModel).subscribe((data : any) => {

      this.authService.login(data.accessToken, data.roles[0], () => {

        toast.success.fire({
          title: 'Signed in successfully',
          timer : 2000
        })

        setTimeout(() => {
          this.router.navigateByUrl('/dashboard');
        }, 2000);

      })
    },
    (err => {
      toast.error.fire({
        title: "Something went wrong!",
        timer : 2000
      })
    })
    );
  }
}
