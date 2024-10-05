import { Component, inject, OnInit } from '@angular/core';
import { WishlistService } from '../../core/services/wishlist.service';
import { CartService } from '../../core/services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { Iwhish } from '../../core/interfaces/iwhish';

@Component({
  selector: 'app-wishlist',
  standalone: true,
  imports: [],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.scss'
})
export class WishlistComponent implements OnInit {

  readonly _WishlistService = inject(WishlistService)
  private readonly _CartService = inject(CartService)
  private readonly _ToastrService = inject(ToastrService)


  wishList!:Iwhish[]

  ngOnInit(): void {
    this._WishlistService.getUserWishlist().subscribe({
      next:(res)=>{
        console.log(res);
        this.wishList = res.data
      }
    })
  }

  removeFromWishlist(id:string):void{
    this._WishlistService.removeFromWishlist(id).subscribe({
      next:(res)=>{
        console.log(res);
        this._ToastrService.success(res.message , `Fresh Cart`)

        this.wishList = this.wishList.filter((wish)=>res.data.includes(wish._id))      

      }
    })
  }

  addToCart(id:string):void {
    this._CartService.addProductToCart(id).subscribe({
      next : (res)=>{
        console.log(res);
        this._ToastrService.success(res.message , `Fresh Products`)
        this._CartService.cartNumber.next(res.numOfCartItems)  


      }
      // ,
      // complete:()=>{
      //   this.removeFromWishlist(id)
      // }
      
    })

  }

}
