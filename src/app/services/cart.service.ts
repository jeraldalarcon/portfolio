import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CartService {

  url:string = ' http://127.0.0.1:8000/api/cart';

  constructor(private http:HttpClient) { }


  getCart(){
    return this.http.get(`${this.url}`)
    .pipe(res=>res);
  }

  addItem(addItemForm){
    return this.http.post(`${this.url}`,addItemForm)
    .pipe(res=>res)
  }

  handleError(error: HttpErrorResponse)
  {
    // return throwError(error.message || "Server Error");
    return throwError(error);
  }

  deleteItem(id){
    return this.http.delete(`${this.url}/${id}`)
    .pipe(res=>res);
  }
}


