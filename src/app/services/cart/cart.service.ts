import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';



@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private http: HttpClient) { }

  public getCartItems(id:string){
    const url = "https://little-sheeree-weoto-d06c8951.koyeb.app/cart/getItems/"+id
    return this.http.get<any>(url)
  }

  public addToCart(id:string,cartItem:any){
    const url = "https://little-sheeree-weoto-d06c8951.koyeb.app/cart/addItem/"+id
    return this.http.post<any>(url,cartItem)
  }

  public removeFromCart(id:string,cartItem:any){
    const url = "https://little-sheeree-weoto-d06c8951.koyeb.app/cart/removeItem/"+id
    return this.http.delete<any>(url,cartItem)
  }

  public updateCart(id:string,cartItem:any){
    const url = "https://little-sheeree-weoto-d06c8951.koyeb.app/cart/updateItem/"+id
    return this.http.patch<any>(url,cartItem)
  }
}
