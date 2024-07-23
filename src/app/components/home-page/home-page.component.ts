import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../services/product/product.service';
interface Products{
  id:string;
  productid:string;
  name:string;
  description:string;
  category:string;
  price:number;
  stock:number;
}
@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent {

  public products:Products[]=[]

  constructor(private productService:ProductService){
    this.productService.getAllProducts().subscribe((res)=>{
      this.products=res
      console.log(res);
    })
  }

}
