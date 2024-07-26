import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient) { }

  public placeOrder(userId:string){
    const url = "http://localhost:3000/orders/place/"+userId
    return this.http.get<any>(url)
  }

  public getAllOrder(){
    const url = "http://localhost:3000/orders"
    return this.http.get<any>(url)
  }

  public updateStatus(id:string,order:any){
    const url = "http://localhost:3000/orders/"+id+"/status"
    return this.http.patch<any>(url,order)
  }

  public deleteOrderByID(itemId:any){
    const url = "http://localhost:3000/orders/"+itemId
    return this.http.delete<any>(url)
  }
}
