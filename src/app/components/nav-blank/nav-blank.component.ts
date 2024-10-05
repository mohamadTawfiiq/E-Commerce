import { Component, inject, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { CartService } from '../../core/services/cart.service';

@Component({
  selector: 'app-nav-blank',
  standalone: true,
  imports: [RouterLink , RouterLinkActive],
  templateUrl: './nav-blank.component.html',
  styleUrl: './nav-blank.component.scss'
})
export class NavBlankComponent implements OnInit {

  private readonly _AuthService = inject(AuthService)
  private readonly _CartService = inject(CartService)


  cartCount : Number = 0
  
  ngOnInit(): void {

    this._CartService.getCart().subscribe({
      next:(res)=>{
        this._CartService.cartNumber.next(res.numOfCartItems)
      }
    })


   this._CartService.cartNumber.subscribe({
    next:(count)=>{
      this.cartCount = count
    }
   })
  }




  logOut():void{
    this._AuthService.logOut()
  }



  

}
