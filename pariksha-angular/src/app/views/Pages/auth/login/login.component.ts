import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { toast } from 'src/app/core/helpers/swalHelp';
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
      username: ['', [Validators.required, this.usernameValidator(/^[A-Za-z][A-Za-z0-9_]{5,29}$/)] ],
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
    });
  }


  usernameValidator (regex : RegExp): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const valid = regex.test(control.value);
      return valid ? null : {regex: {value: control.value}};
    };
  }
}
