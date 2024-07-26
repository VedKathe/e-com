import { Component ,EventEmitter,OnInit, Output} from '@angular/core';
import { FormControl, FormGroup ,ReactiveFormsModule,FormBuilder, Validators} from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { LocalService } from '../../services/local/local.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import {NameWhiteSpace} from '../../validation/NameWhiteSpace.validator'
import { Toast, ToastrService } from 'ngx-toastr';
interface Config {
  token: string;
  user: any;
}

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})



export class LoginPageComponent {

  myForm: FormGroup;

  @Output() runStatusEmiter = new EventEmitter();

  toggle(){
    
  }

  email_pattern: RegExp = /^(?!\s)[a-zA-Z0-9]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
  password_pattern = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$"
  StrongPasswordRegx: RegExp =
  /^(?=[^A-Z]*[A-Z])(?=[^a-z]*[a-z])(?=\D*\d).{8,}$/;


  constructor(private torstr:ToastrService,private fb: FormBuilder, private authservice: AuthService, private localStore: LocalService, private router:Router) {
    this.myForm = this.fb.group({
      email: ['', [Validators.required, Validators.email,Validators.pattern(this.email_pattern)]],
      password: ['', [Validators.required, Validators.minLength(8),Validators.pattern(this.StrongPasswordRegx),NameWhiteSpace.noSpaceAllowed]]
    });
  }

  login: FormGroup = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });

  onSubmit() {


    this.authservice.getLogin(this.myForm.value.email,this.myForm.value.password).subscribe({next: (res)=>
    {
      this.localStore.saveData("token",res.token)
      this.localStore.saveData("user",res.user)
      this.router.navigate(["/"])
    },
    error: (error) => {
      if (error.status === 401) {
        // Optionally, you can show an alert or a message to the user
        this.torstr.error('Unauthorized: Incorrect email or password.');
      } else {
        // Handle other errors
        console.error('An error occurred:', error);
      }
    }})
    
  }
}
