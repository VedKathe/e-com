import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

interface Products{
  id:string;
  productid:string;
  name:string;
  description:string;
  category:string;
  price:number;
  stock:number;
}

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  public getAllProducts()
  {
    const url = "http://localhost:3000/products"
    return this.http.get<Products[]>(url)
  }

  public addProduct(product:Products){
    const url = "http://localhost:3000/products"
    return this.http.post<Products[]>(url,product)
  }

  public updateProduct(id:string, product:Products){
    const url = "http://localhost:3000/products/"+id
    return this.http.patch<Products[]>(url,product)
  }
}
