import { Component ,OnInit} from '@angular/core';
import { FormControl, FormGroup ,ReactiveFormsModule,FormBuilder} from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { LocalService } from '../../services/local/local.service';

interface Config {
  token: string;
  user: any;
}

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})



export class LoginPageComponent {

  myForm: FormGroup;

  constructor(private fb: FormBuilder, private authservice: AuthService, private localStore: LocalService) {
    this.myForm = this.fb.group({
      email: '',
      password:''
    });
  }

  login: FormGroup = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });

  onSubmit(form: FormGroup) {
    console.log('Valid?', form.valid); // true or false

    console.log('Email', form.value.email);
    console.log('Password', form.value.password);

    this.authservice.getLogin(form.value.email,form.value.password).subscribe((res)=>
    {
      
      this.localStore.saveData("token",res.token)
      this.localStore.saveData("user",res.user)

      console.log(this.localStore.getData("user"));
    })

    this.authservice.validateToken("dhauknsjandj,sabdykbaksndkuad").subscribe((res)=>{
      console.log(res);
    })
  }
}
