import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

private readonly _HttpClient = inject(HttpClient)

paymentByVisa(id:string|null , shipping:object):Observable<any>{
  return this._HttpClient.post(`${environment.baseUrl}/api/v1/orders/checkout-session/${id}?url=http://localhost:4200` , {
    "shippingAddress" : shipping
  }
)
}

paymentByCash(id:string|null , shipping:object):Observable<any>{
  return this._HttpClient.post(`${environment.baseUrl}/api/v1/orders/${id}` , {
    "shippingAddress" : shipping
  })
}


getAllOrders(id:string):Observable<any>{
  return this._HttpClient.get(`${environment.baseUrl}/api/v1/orders/user/${id}`)
}

}
