import { Component } from '@angular/core';
import { OrderService } from '../../services/order/order.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-admin-order-page',
  standalone: true,
  imports: [CommonModule,FormsModule],
  providers:[DatePipe],
  templateUrl: './admin-order-page.component.html',
  styleUrl: './admin-order-page.component.css'
})
export class AdminOrderPageComponent {

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

  public setStatus(event:any,item:any){
      console.log(event.target.value );
      item.status=event.target.value;
      this.orderService.updateStatus(item.id,item).subscribe((res)=>
      {
        console.log(res);
      })
  }


  public deleteOrder(item:any)
  {
    this.orderService.deleteOrderByID(item.id).subscribe((res)=>{
      this.orders= this.orders.filter((val)=>val.id != item.id)
    })

  }


  

}
