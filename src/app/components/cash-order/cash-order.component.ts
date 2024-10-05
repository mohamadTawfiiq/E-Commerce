import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { OrdersService } from '../../core/services/orders.service';

@Component({
  selector: 'app-cash-order',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './cash-order.component.html',
  styleUrl: './cash-order.component.scss'
})
export class CashOrderComponent implements OnInit {


  private readonly _FormBuilder = inject(FormBuilder)
  private readonly _ActivatedRoute = inject(ActivatedRoute)
  private readonly _OrdersService = inject(OrdersService)
  private readonly _Router = inject(Router)
  

  ordersCash:FormGroup = this._FormBuilder.group({
    details : [null , [Validators.required, Validators.minLength(30), Validators.maxLength(200)]],
    phone : [null , [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)]],
    city : [null],
  })

  cartId:string|null = ""

  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe({
      next:(params)=>{
        this.cartId  = params.get('id')
        console.log(this.cartId  );
        
      }
    })
  }

  navToAllOrders():void{

    this._OrdersService.paymentByCash(this.cartId , this.ordersCash.value).subscribe({
         next:(res)=>{
           console.log(res);
           if(res.status == `success`){
            this._Router.navigate([`/allorders`])
           }

         },
         error:(err)=>{
           console.log(err);
         }
  })

    // this._OrdersService.paymentByVisa(this.cartId , this.ordersCash.value ).subscribe({
    //   next:(res)=>{
    //     console.log(res);
    //     if(res.status == `success`){
    //       open(res.session.url)
    //     }
    //   },
    //   error:(err)=>{
    //     console.log(err);
    //   }
    // })

    // console.log(this.orders.value);
    
    
  }


}
