import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { errorHandler } from '@angular/platform-browser/src/browser';
import { HttpClient , HttpHeaders , HttpErrorResponse} from '@angular/common/http';
import { map, filter, catchError, mergeMap } from 'rxjs/operators';
import { Observable, pipe, of, throwError,  } from 'rxjs';

const httpOptions  = {
  headers: new HttpHeaders({
    'Content-Type':'application/json',
    'enctype':'multipart/form-data',
    // 'X-Requested-With':'XMLHttpRequest'
  })
};

@Injectable({
  providedIn: 'root'
})

export class ProductService {
  searchUrl = 'http://127.0.0.1:8000/api';
  url = 'http://127.0.0.1:8000/api/product';
  all_url ='http://127.0.0.1:8000/api/productList';
  deleteItem:any;

  constructor(
    private router:Router,
    private http:HttpClient
  ) { }

  productNotify(){
    return this.http.get(`http://127.0.0.1:8000/api/productNotify`)
    .pipe(res=>res);
  }

  getProduct()
  {
    let data = localStorage.getItem('token');
    
    return this.http.get(`${this.url}`)
      .pipe(res=>res);
  }

  getAllProduct()
  {
    return this.http.get(`${this.all_url}`)
    .pipe(res=>res)
  }

  addService(formData){
    // console.log('serviceFormData:',formData);
    // let data = JSON.stringify(formData);
    return this.http.post(`${this.url}`,formData)
    .pipe(
      catchError(this.handleError)
    );
  }

  handleError(error: HttpErrorResponse)
  {
    // return throwError(error.message || "Server Error");
    return throwError(error);
  }

  getSingleProduct(id:any)
  {
    return this.http.get(`${this.all_url}/${id}`)
    .pipe(res=>res);
  }

  getSingleData(id:any){
    return this.http.get(`${this.url}/${id}/edit`)
    .pipe(res=>res);
  }

  editService(id,data){
    console.log('product names:',data['product_name']);

    const _formData = new FormData();
    _formData.append('product_name',data['product_name']);
    _formData.append('product_description',data['product_description']);
    _formData.append('product_price',data['product_price']);
    _formData.append('product_image',data['product_image']);

    let header = {
      headers:new HttpHeaders({'Content-Type':'application/json'})
    };
    return this.http.put(`${this.url}/${id}`,_formData, header)
    .pipe(res=>res);
  }

  deletedService(id:number){
    return this.http.delete(`${this.url}/${id}`)
    .pipe(
      map(
        result =>{
          this.deleteItem = result;
        }
      )
    );
  }

  search(data){
    return this.http.get(`${this.searchUrl}/searchProduct/${data}`)
    .pipe(res=>res);
  }

}
