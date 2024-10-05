import { jwtDecode } from 'jwt-decode';
import { Component, inject, OnInit } from '@angular/core';
import { OrdersService } from '../../core/services/orders.service';

@Component({
  selector: 'app-allorders',
  standalone: true,
  imports: [],
  templateUrl: './allorders.component.html',
  styleUrl: './allorders.component.scss'
})
export class AllordersComponent implements OnInit {

  private readonly _OrdersService = inject(OrdersService)

  userToken: any
  userData:any

  userOrders : any

  ngOnInit(): void {

    this.userToken = localStorage.getItem(`userToken`)

    this.userData = jwtDecode(this.userToken);

    this._OrdersService.getAllOrders(this.userData.id).subscribe({
      next: (res) => {
        this.userOrders = res
        console.log(this.userOrders);

      },
      error: (err) => {
        console.log(err);

      }
    })

  }



}
