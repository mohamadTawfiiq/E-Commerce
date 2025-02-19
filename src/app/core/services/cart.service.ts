import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor() { }

  private readonly _HttpClient = inject(HttpClient)

  cartNumber : BehaviorSubject<number> = new BehaviorSubject(0) 

  addProductToCart(id: string): Observable<any> {
    return this._HttpClient.post(`${environment.baseUrl}/api/v1/cart`,
      {
        "productId": id
      }
    )


  }


  getCart(): Observable<any>{
    return this._HttpClient.get(`${environment.baseUrl}/api/v1/cart`)
  }


  removeProduct(id:string): Observable<any>{

    return this._HttpClient.delete(`${environment.baseUrl}/api/v1/cart/${id}`)

  }


  updateCount(id:string , Counter:number):Observable<any>{
    return this._HttpClient.put(`${environment.baseUrl}/api/v1/cart/${id}` ,
      {
        "count": Counter
      }
    )
  }


  deleteCart():Observable<any>{
    return this._HttpClient.delete(`${environment.baseUrl}/api/v1/cart`)
  }

}
