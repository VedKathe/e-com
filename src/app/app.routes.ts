import { Routes } from '@angular/router';
import { HomePageComponent } from './components/home-page/home-page.component';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { authGuard } from './guard/auth.guard';
import { AdminHomeComponent } from './components/admin-home/admin-home.component';
import { adminGuard } from './guard/admin.guard';
import { AdminProductPageComponent } from './components/admin-product-page/admin-product-page.component';
import { AdminOrderPageComponent } from './components/admin-order-page/admin-order-page.component';
import { CartPageComponent } from './components/cart-page/cart-page.component';
import { RegistrationPageComponent } from './components/registration-page/registration-page.component';

export const routes: Routes = [
   
    {
        path:"" , component: HomePageComponent 
    },
    {
        path:"login" , component: LoginPageComponent
    },
    {
        path:"registration" , component: RegistrationPageComponent
    },
    {
        path:"cart" , component: CartPageComponent
    },
    {
        path:'admin', component:AdminHomeComponent,canActivate:[authGuard,adminGuard] 
    },
    {
        path:'admin/product', component:AdminProductPageComponent,canActivate:[authGuard,adminGuard] 
    },
    {
        path:'admin/order', component:AdminOrderPageComponent,canActivate:[authGuard,adminGuard]
    }
];
