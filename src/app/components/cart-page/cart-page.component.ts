import { Component } from '@angular/core';
import { CartService } from '../../services/cart/cart.service';
import { LocalService } from '../../services/local/local.service';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { OrderService } from '../../services/order/order.service';
@Component({
  selector: 'app-cart-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart-page.component.html',
  styleUrl: './cart-page.component.css'
})
export class CartPageComponent {
  carts: any[] = [];
  subTotel: number = 0;

  constructor(private cartService: CartService, private localStore: LocalService, private toastr: ToastrService, private orderService: OrderService){
    this.cartService.getCartItems(this.localStore.getUserId()).subscribe((res) => {
      this.carts = res
      console.log(res);
      this.calSubtotel()
    })
  }

  removeFromCart(cartItem: any) {
    const payload = { productId: cartItem.id }
    this.cartService.removeFromCart(this.localStore.getUserId(), payload).subscribe((res) => {
      console.log(res);
    })
  }

  updateAddQuantity(cartItem: any) {
    cartItem.quantity += 1
    const payload = { productId: cartItem.product.id, quantity: cartItem.quantity }
    this.cartService.updateCart(this.localStore.getUserId(), payload).subscribe((res) => {
      console.log(res);
    })
    this.calSubtotel()
  }

  updateReduceQuantity(cartItem: any) {
    cartItem.quantity -= 1

    if (cartItem.quantity < 1) {
      const payload = { productId: cartItem.product.id }
      this.cartService.removeFromCart(this.localStore.getUserId(), payload).subscribe((res) => {
        console.log(res);
        this.toastr.success("Item Removed");
      })
      this.carts = this.carts.filter((val) => val.product.id != cartItem.product.id)
    } else {
      const payload = { productId: cartItem.product.id, quantity: cartItem.quantity }
      this.cartService.updateCart(this.localStore.getUserId(), payload).subscribe((res) => {
        console.log(res);
      })
    }

    this.calSubtotel()
  }


  calSubtotel(){
    this.subTotel=0
    this.carts.forEach((val)=>
    {
      this.subTotel += (val.product.price*val.quantity)
    })
    
  }

  proceedToPay(){
    this.toastr.success("Payment Done")
    this.orderService.placeOrder(this.localStore.getUserId()).subscribe((res)=>{
      console.log(res);
      this.carts = []
    })

  }
}
