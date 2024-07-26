import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../services/product/product.service';
import { CartService } from '../../services/cart/cart.service';
import { LocalService } from '../../services/local/local.service';
import { ToastrService } from 'ngx-toastr';
interface Products {
  id: string;
  productid: string;
  name: string;
  description: string;
  category: string;
  price: number;
  stock: number;
}
@Component({
  selector: 'app-product-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-page.component.html',
  styleUrl: './product-page.component.css'
})
export class ProductPageComponent {
  @Output() runCartEmitter = new EventEmitter();

  public products: Products[] = []

  constructor(private productService: ProductService, private cartService: CartService, private localStore: LocalService, private toastr: ToastrService) {
    this.productService.getAllProducts().subscribe((res) => {
      this.products = res
      console.log(res);
    })
  }

  addItemToCart(cartItem: any) {

    console.log(cartItem);

    const payload = { productId: cartItem.id, quantity: 1 }

    this.cartService.addToCart(this.localStore.getUserId(), payload).subscribe((res) => {
      this.toastr.success("Item Added to Cart");
      this.runCartEmitter.emit()
    })

  }
}
