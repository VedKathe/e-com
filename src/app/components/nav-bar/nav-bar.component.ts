import { Component ,Input} from '@angular/core';
import { LocalService } from '../../services/local/local.service';
import { AuthService } from '../../services/auth.service';
import { NgIf,NgTemplateOutlet } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [NgIf,NgTemplateOutlet],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent {

  @Input() noOfCartItems:number = 0;

  constructor(public localStore: LocalService, public authService:AuthService, public router:Router){
      console.log(authService.isLoggedIn());
  }

 public navigate(url:string){
  this.router.navigate([url])
 }

 public logout(){
  this.authService.logout()
  this.router.navigate(['/'])
 }

}
