import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { HttpClientModule } from  '@angular/common/http';
import { AuthService } from './services/auth.service';
import { ProductService } from './services/product/product.service';
import { LocalService } from './services/local/local.service';
import { CartService } from './services/cart/cart.service';
import { OrderService } from './services/order/order.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet,NavBarComponent,HttpClientModule],
  providers:[AuthService,ProductService,LocalService,CartService,OrderService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'client';

  loginStatus:string='logout'

  noOfCartItems:number=0



  constructor(private cartService:CartService,private localStore:LocalService){
    if(localStore.checkUser()){
    this.cartService.getCartItems(this.localStore.getUserId()).subscribe((res)=>{
        this.noOfCartItems = res.length
        console.log(res.length);
    })
  }
  }

  changeStatus(){
    this.loginStatus = this.loginStatus==='logout'? 'login': 'logout';
    console.log('Toggled');
  }

  subtoEmit(comRef:any)
  {
    comRef.runCartEmitter.subscribe((res:any)=>{
      this.cartService.getCartItems(this.localStore.getUserId()).subscribe((res)=>{
        this.noOfCartItems = res.length
        console.log(res.length);
    })
    })
  }
}
