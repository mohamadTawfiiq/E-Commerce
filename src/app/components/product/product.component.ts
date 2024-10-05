import { Component, inject, OnInit } from '@angular/core';
import { ProductService } from '../../core/services/product.service';
import { Iproduct } from '../../core/interfaces/iproduct';
import { Subscription } from 'rxjs';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SearchPipe } from '../../core/pipes/search.pipe';
import { CartService } from '../../core/services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { WishlistService } from '../../core/services/wishlist.service';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [RouterLink, FormsModule, SearchPipe],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})
export class ProductComponent implements OnInit {

  private readonly _ProductService = inject(ProductService);
  private readonly _CartService = inject(CartService)
  private readonly _ToastrService = inject(ToastrService)
  readonly _WishlistService = inject(WishlistService)



  searchWord: string = ""


  productsList!: Iproduct[]


  unsubscribeProsucts!: Subscription



  ngOnInit(): void {

    this.unsubscribeProsucts = this._ProductService.getAllProduct().subscribe({
      next: (res) => {

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



  addToCart(id: string): void {
    this._CartService.addProductToCart(id).subscribe({
      next: (res) => {
        console.log(res);
        this._ToastrService.success(res.message, `Fresh Products`)
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
