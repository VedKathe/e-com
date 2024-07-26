import { Component } from '@angular/core';
import { FormControl, FormGroup ,ReactiveFormsModule,FormBuilder, Validators} from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { LocalService } from '../../services/local/local.service';
import { Router } from '@angular/router';
import { NameWhiteSpace } from '../../validation/NameWhiteSpace.validator';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-registration-page',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './registration-page.component.html',
  styleUrl: './registration-page.component.css'
})
export class RegistrationPageComponent {
  myForm: FormGroup;

  email_pattern: RegExp = /^(?!\s)[a-zA-Z0-9]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
  StrongPasswordRegx: RegExp =
  /^(?=[^A-Z]*[A-Z])(?=[^a-z]*[a-z])(?=\D*\d).{8,}$/;

  constructor(private torstr:ToastrService,private fb: FormBuilder, private authservice: AuthService, private localStore: LocalService, private router:Router) {
    this.myForm = this.fb.group({
      email:new FormControl ('', [Validators.required, Validators.email,Validators.pattern(this.email_pattern)]),
      password:new FormControl ('', [Validators.required, Validators.minLength(8),Validators.pattern(this.StrongPasswordRegx),NameWhiteSpace.noSpaceAllowed]),
      username:new FormControl('', [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(12),
        Validators.pattern("^[A-Za-z][A-Za-z0-9_]{4,13}")]),
    });
  }



  onSubmit(form: FormGroup) {

    console.log(form.value);

    this.authservice.registerUser(form.value).subscribe({next:(res)=>
    {
      this.localStore.saveData("token",res.token)
      this.localStore.saveData("user",res.user)
      this.router.navigate(["/"])
    },
    error:(error)=>{
      if (error.status === 409) {
        // Optionally, you can show an alert or a message to the user
        this.torstr.error('Email Already Registered');
      } else {
        // Handle other errors
        console.error('An error occurred:', error);
      }
    }
  })
    
  }

}
