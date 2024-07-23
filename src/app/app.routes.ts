import { Routes } from '@angular/router';
import { HomePageComponent } from './components/home-page/home-page.component';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { authGuard } from './guard/auth.guard';


export const routes: Routes = [
    {
        path:"" , component: HomePageComponent, canActivate:[authGuard]
    },
    {
        path:"login" , component: LoginPageComponent
    },
];
