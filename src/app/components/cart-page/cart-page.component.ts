import { Component } from '@angular/core';
import { CartService } from '../../services/cart/cart.service';
import { LocalService } from '../../services/local/local.service';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-cart-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart-page.component.html',
  styleUrl: './cart-page.component.css'
})
export class CartPageComponent {
  carts:any=[];

  constructor(private cartService:CartService,private localStore:LocalService){
    this.cartService.getCartItems(this.localStore.getUserId()).subscribe((res)=>{
      this.carts=res
      console.log(res);
    })
  }


}
