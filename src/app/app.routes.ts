import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { authGuard } from './core/guards/auth.guard';
import { blankGuard } from './core/guards/blank.guard';
import { AuthlayoutComponent } from './layouts/authlayout/authlayout.component';
import { BlanklayoutComponent } from './layouts/blanklayout/blanklayout.component';

export const routes: Routes = [
    {path:"" , component:AuthlayoutComponent , canActivate:[blankGuard] , children:[
        {path:"" , redirectTo:"login" , pathMatch:"full"},
        {path:"login" , loadComponent:()=> import('./components/login/login.component').then((c)=>c.LoginComponent) , title:"Login Page"},
        {path:"register" , loadComponent:()=> import('./components/register/register.component').then((c)=>c.RegisterComponent) , title:"Register Page"},
        {path:"forgot" , loadComponent:()=> import('./components/forgotpassword/forgotpassword.component').then((c)=>c.ForgotpasswordComponent) , title:"Forgotpassword Page"}
    ]},
    {path:"" , component:BlanklayoutComponent , canActivate:[authGuard] , children:[
        {path:"" , redirectTo:"home" , pathMatch:"full"}, 
        {path:"home" , component:HomeComponent , title:"Home Page"}, 
        {path:"cart" , loadComponent:()=> import('./components/cart/cart.component').then((c)=>c.CartComponent) , title:"Cart Page"}, 
        {path:"product" , loadComponent:()=> import('./components/product/product.component').then((c)=>c.ProductComponent) , title:"Product Page"}, 
        {path:"categories" , loadComponent:()=> import('./components/categories/categories.component').then((c)=>c.CategoriesComponent) , title:"Categories Page"}, 
        {path:"brands" , loadComponent:()=> import('./components/brands/brands.component').then((c)=>c.BrandsComponent) , title:"Brands Page"},
        {path:"details/:id" , loadComponent:()=> import('./components/details/details.component').then((c)=>c.DetailsComponent) , title:"Details Page"},
        {path:"allorders" , loadComponent:()=> import('./components/allorders/allorders.component').then((c)=>c.AllordersComponent) , title:"Allorders Page"},
        {path:"orders/:id" , loadComponent:()=> import('./components/orders/orders.component').then((c)=>c.OrdersComponent) , title:"Orders By Visa Page"},
        {path:"cashOrder/:id" , loadComponent:()=> import('./components/cash-order/cash-order.component').then((c)=>c.CashOrderComponent) , title:"Order By Cash Page"},
        {path:"wishlist" , loadComponent:()=> import('./components/wishlist/wishlist.component').then((c)=>c.WishlistComponent) , title:"Wish List Page"},
        {path:"catdetails/:id" , loadComponent:()=> import('./components/cat-details/cat-details.component').then((c)=>c.CatDetailsComponent) , title:"Category Details Page"}

    ]} ,
    {
        path:'**' , loadComponent:()=> import('./components/notfound/notfound.component').then((c)=>c.NotfoundComponent) , title:'Page Not Found'
    }
];
