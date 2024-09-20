import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient) { }

  public placeOrder(userId:string){
    const url = environment.apiUrl + "/orders/place/"+userId
    return this.http.get<any>(url)
  }

  public getAllOrder(){
    const url = environment.apiUrl + "/orders"
    return this.http.get<any>(url)
  }

  public updateStatus(id:string,order:any){
    const url = environment.apiUrl + "/orders/"+id+"/status"
    return this.http.patch<any>(url,order)
  }

  public deleteOrderByID(itemId:any){
    const url = environment.apiUrl + "/orders/"+itemId
    return this.http.delete<any>(url)
  }
}
