import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient) { }

  public placeOrder(userId:string){
    const url = "https://hollow-felita-weoto-170346d6.koyeb.app/orders/place/"+userId
    return this.http.get<any>(url)
  }

  public getAllOrder(){
    const url = "https://hollow-felita-weoto-170346d6.koyeb.app/orders"
    return this.http.get<any>(url)
  }

  public updateStatus(id:string,order:any){
    const url = "https://hollow-felita-weoto-170346d6.koyeb.app/orders/"+id+"/status"
    return this.http.patch<any>(url,order)
  }

  public deleteOrderByID(itemId:any){
    const url = "https://hollow-felita-weoto-170346d6.koyeb.app/orders/"+itemId
    return this.http.delete<any>(url)
  }
}
