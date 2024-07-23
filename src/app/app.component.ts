import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { HttpClientModule } from  '@angular/common/http';
import { AuthService } from './services/auth.service';
import { ProductService } from './services/product/product.service';
import { LocalService } from './services/local/local.service';
import { CartService } from './services/cart/cart.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet,NavBarComponent,HttpClientModule],
  providers:[AuthService,ProductService,LocalService,CartService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'client';
}
