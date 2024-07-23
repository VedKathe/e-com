import { Component } from '@angular/core';
import { ProductService } from '../../services/product/product.service';
import { CommonModule } from '@angular/common';
import { FormsModule ,NgForm} from '@angular/forms';
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
  selector: 'app-admin-product-page',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './admin-product-page.component.html',
  styleUrl: './admin-product-page.component.css'
})
export class AdminProductPageComponent {

  public products:Products[]=[]

  productDetails: Products = {
    productid: '',
    name: '',
    description: '',
    category: '',
    price: 0,
    stock: 0,
    id: ''
  };

  submitProductForm(form: NgForm) {
    if (form.valid) {
      console.log(this.productDetails);
      // Handle form submission logic here
      this.porductService.addProduct(form.value).subscribe((res)=>{
        console.log(res);
      })
    }
  }

   constructor(private porductService:ProductService){
    this.porductService.getAllProducts().subscribe((res)=>{
      this.products=res
      console.log(res);
    })
   }

   setNewProduct(){
    this.productDetails = {
      productid: '',
      name: '',
      description: '',
      category: '',
      price: 0,
      stock: 0,
      id: ''
    }
   }

   setCurrentProduct(product:Products){
    this.productDetails = product;
   }

   submitEditForm(form: NgForm) {
    if (form.valid) {
      console.log(this.productDetails);
      // Handle form submission logic here
      this.porductService.updateProduct(this.productDetails.id,form.value).subscribe((res)=>{
        console.log(res);
      })
    }
  }
}
