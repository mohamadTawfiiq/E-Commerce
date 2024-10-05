import { Component, inject, OnInit } from '@angular/core';
import { CartService } from '../../core/services/cart.service';
import { Icart } from '../../core/interfaces/icart';
import { CurrencyPipe } from '@angular/common';
import { log } from 'console';
import { RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CurrencyPipe,RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit {

  private readonly _CartService = inject(CartService)
  private readonly _ToastrService = inject(ToastrService)

  userCart: Icart = {} as Icart

  ngOnInit(): void {
    this._CartService.getCart().subscribe({
      next: (res) => {
        console.log(res.data);
        this.userCart = res.data
      }
    })
  }


  DeleteOroduct(id: string): void {
    this._CartService.removeProduct(id).subscribe({
      next: (res) => {
        console.log(res);
        this.userCart = res.data
        this._CartService.cartNumber.next(res.numOfCartItems)
        this._ToastrService.warning(res.status+' product Was Deleted' , `Fresh Cart`)

      }
    })
  }


  UpdateCount(id: string, Counter: number): void {
    if (Counter > 0) {
      this._CartService.updateCount(id, Counter).subscribe({
        next: (res) => {
          console.log(res);
          this.userCart = res.data

        }
      })
    }

  }

  ClearCart():void{
  this._CartService.deleteCart().subscribe({
    next:(res)=>{
      console.log(res);
      this.userCart = {} as Icart
      this._CartService.cartNumber.next(0)

      
    }
  })
  
  }

}
