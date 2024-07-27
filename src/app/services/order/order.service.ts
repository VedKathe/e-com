import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient) { }

  public placeOrder(userId:string){
    const url = "https://e-comm-api/orders/place/"+userId
    return this.http.get<any>(url)
  }

  public getAllOrder(){
    const url = "https://e-comm-api/orders"
    return this.http.get<any>(url)
  }

  public updateStatus(id:string,order:any){
    const url = "https://e-comm-api/orders/"+id+"/status"
    return this.http.patch<any>(url,order)
  }

  public deleteOrderByID(itemId:any){
    const url = "https://e-comm-api/orders/"+itemId
    return this.http.delete<any>(url)
  }
}
