import { Component } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faDollarSign } from '@fortawesome/free-solid-svg-icons';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { faBasketShopping} from '@fortawesome/free-solid-svg-icons';

import { OrderService } from '../../services/order/order.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-admin-home',
  standalone: true,
  imports: [MatIconModule,FontAwesomeModule,CommonModule],
  providers:[DatePipe],
  templateUrl: './admin-home.component.html',
  styleUrl: './admin-home.component.css'
})
export class AdminHomeComponent {
    dollor = faDollarSign
    cart = faCartShopping
    basket = faBasketShopping

    orders:any[]=[]
  

    constructor(private orderService:OrderService){
        this.orderService.getAllOrder().subscribe((res)=>{
          this.orders=res;
          
          console.log(res);
        })
    }
  
    public getItems(items:any[]){
      return items.map((val)=>{
         return `${val.product.name} x ${val.quantity}\n`
      })
    }
}
