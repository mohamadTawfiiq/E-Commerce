import { Iproduct } from './../../core/interfaces/iproduct';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../core/services/product.service';
import { CartService } from '../../core/services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { WishlistService } from '../../core/services/wishlist.service';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})
export class DetailsComponent implements OnInit {

  private readonly _ActivatedRoute = inject(ActivatedRoute)
  private readonly _ProductService = inject(ProductService)
  private readonly _CartService = inject(CartService)
  private readonly _ToastrService = inject(ToastrService)
  readonly _WishlistService = inject(WishlistService)


  detailsProduct: Iproduct | null = null ;
  idOf_Product : string = ""

  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe({
      next:(p)=>{

        console.log(p.get('id'));

         this.idOf_Product = p.get('id') !

        this._ProductService.getSpecificProduct(this.idOf_Product).subscribe({

          next:(res)=>{
            console.log(res.data);
            this.detailsProduct = res.data
            
          },
          error:(err)=>{
            console.log(err);
            
          }

        })

      }
    })

    this._WishlistService.getUserWishlist().subscribe({
      next:(res)=>{
        this._WishlistService.WishlistData = res.data.map((item:any)=>item._id)
        
      }
    })


  }


  addToCart():void{
    this._CartService.addProductToCart(this.idOf_Product).subscribe({
      next:(res)=>{
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
