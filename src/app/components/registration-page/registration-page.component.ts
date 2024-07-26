import { Component } from '@angular/core';
import { FormControl, FormGroup ,ReactiveFormsModule,FormBuilder} from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { LocalService } from '../../services/local/local.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration-page',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './registration-page.component.html',
  styleUrl: './registration-page.component.css'
})
export class RegistrationPageComponent {
  myForm: FormGroup;

  constructor(private fb: FormBuilder, private authservice: AuthService, private localStore: LocalService, private router:Router) {
    this.myForm = this.fb.group({
      email: '',
      password:'',
      username:''
    });
  }



  onSubmit(form: FormGroup) {

    console.log(form.value);

    this.authservice.registerUser(form.value).subscribe((res)=>
    {
      this.localStore.saveData("token",res.token)
      this.localStore.saveData("user",res.user)
      this.router.navigate(["/"])
    })
    
  }

}
