import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ToastrModule, ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-verify',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './verify.component.html',
  styleUrl: './verify.component.css'
})
export class VerifyComponent implements OnInit {

  alreadyVerified: boolean = false
  verified: boolean = false
  token: string = '';

  constructor(private route: ActivatedRoute, private authService: AuthService, private toustr: ToastrService , private routes:Router) { }
  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      console.log(params); // { order: "popular" }
      this.token = params['token']
      console.log(this.token);
      this.authService.verifyEmail(this.token).subscribe({
        next: (res) => {
          setTimeout(() => {
            this.verified = true
          }, 2000);

        },
        error:(err)=>{
          console.log(err.error.message);
          if(err.error.message=='Bad confirmation token'){
              this.toustr.error(err.error.message)
              setTimeout(() => {
                this.routes.navigate(['/'])
              }, 2000);
          } else if(err.error.message=='Email already confirmed'){
            this.toustr.success(err.error.message)
              setTimeout(() => {
                this.routes.navigate(['/login'])
              }, 2000);
          }
          
        }
      });

    }
    );
  }
}


