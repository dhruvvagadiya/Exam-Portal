import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { toast } from 'src/app/core/helpers/swalHelp';
import { checkPasswords, mobileValidator, usernameValidator } from 'src/app/core/helpers/validators';
import { SignupModel } from 'src/app/core/models/User/signup.model';
import { AccountService } from 'src/app/core/services/account.service';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: 'register.component.html',
  styleUrls: ['register.component.scss']
})

export class RegisterComponent implements OnInit {

  registerModel! : SignupModel
  registerForm! : FormGroup

  constructor(private fb : FormBuilder, private accountService : AccountService, private authService : AuthService, private router : Router) { }

  ngOnInit() {

    this.registerForm = this.fb.group({
      firstName : [null, [Validators.required, Validators.maxLength(30)]],
      lastName : [null, [Validators.required,  Validators.maxLength(30)]],
      username : [null, [Validators.required, usernameValidator()]],
      email : [null, [Validators.required, Validators.email]],
      password : [null, [Validators.required, Validators.minLength(6), Validators.maxLength(40)]],
      confirmPassword : [null, [Validators.required]],
      mobile : [null, [Validators.required, mobileValidator()]],
      gender : [0, Validators.required]
    },
    { validator : checkPasswords });
  }

  onSubmit() {
    this.registerModel = {
      email : this.registerForm.controls['email'].value,
      password : this.registerForm.controls['password'].value,
      username : this.registerForm.controls['username'].value,
      firstName : this.registerForm.controls['firstName'].value,
      lastName : this.registerForm.controls['lastName'].value,
      gender : this.registerForm.controls['gender'].value,
      mobile : this.registerForm.controls['mobile'].value
    }

    // this.registerForm.reset();

    this.accountService.register(this.registerModel).subscribe((data : any) => {
      
      this.authService.login(data.accessToken, data.roles[0], () => {

        toast.success.fire({
          title: 'User Registered successfully!',
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