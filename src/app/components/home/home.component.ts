import { WishlistService } from './../../core/services/wishlist.service';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ProductService } from '../../core/services/product.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Iproduct } from '../../core/interfaces/iproduct';
import { Subscription } from 'rxjs';
import { RouterLink } from '@angular/router';
import { CategoriesService } from '../../core/services/categories.service';
import { Icategory } from '../../core/interfaces/icategory';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { FormsModule } from '@angular/forms';
import { SearchPipe } from '../../core/pipes/search.pipe';
import { CartService } from '../../core/services/cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink,CarouselModule , FormsModule , SearchPipe],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit,OnDestroy {


  private readonly _ProductService = inject(ProductService);
  private readonly _CategoriesService = inject(CategoriesService)
  private readonly _CartService = inject(CartService)
  private readonly _ToastrService = inject(ToastrService)
  readonly _WishlistService = inject(WishlistService)



  searchWord:string = ""


  productsList!:Iproduct[]
  categoriesList!: Icategory[]
  // WishlistData:string[] = []


  unsubscribeProducts! : Subscription


  mainSlider: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    autoplay: true,
    autoplayTimeout: 2000,
    autoplayHoverPause: true,
    pullDrag: false,
    dots: true,
    navSpeed: 700,
    navText: ['Prev', 'Next'],
    items:1,
    nav: false
  }

  categoriesSlider: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    autoplay: true,
    autoplayTimeout: 2000,
    autoplayHoverPause: true,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['Prev', 'Next'],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 5
      }
    },
    nav: true
  }


  ngOnInit(): void {

     this._CategoriesService.getAllCategories().subscribe({
      next:(res)=>{
        console.log(res.data);
        this.categoriesList = res.data
      }
    })


    this.unsubscribeProducts = this._ProductService.getAllProduct().subscribe({
      next : (res)=>{

        this.productsList = res.data
        console.log(res.data);
      }
    })

    this._WishlistService.getUserWishlist().subscribe({
      next:(res)=>{
        this._WishlistService.WishlistData = res.data.map((item:any)=>item._id)
        
      }
    })
  }

  ngOnDestroy(): void {
    this.unsubscribeProducts?.unsubscribe()
  }


  addToCart(id:string):void {
    this._CartService.addProductToCart(id).subscribe({
      next : (res)=>{
        console.log(res);
        this._ToastrService.success(res.message , `Fresh Products`)
        this._CartService.cartNumber.next(res.numOfCartItems)  
        
      }
    })
  }

  addToWishlist(id:string):void{
    this._WishlistService.addToWishlist(id).subscribe({
      next:(res)=>{
        console.log(res);
        this._ToastrService.success(`Successfully Added To Wish List` , `Fresh Products`)
        this._WishlistService.WishlistData  = res.data
      }
    })
  }


  removeFromWishlist(id:string):void{
    this._WishlistService.removeFromWishlist(id).subscribe({
      next:(res)=>{
        console.log(res);
        this._ToastrService.warning(res.message , `Fresh Cart`)
        this._WishlistService.WishlistData = res.data
      }
    })
  }


}
