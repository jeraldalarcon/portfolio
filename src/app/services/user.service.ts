import { Injectable } from '@angular/core';
import { HttpClient , HttpHeaders , HttpErrorResponse} from '@angular/common/http';
import { map, filter, catchError, mergeMap } from 'rxjs/operators';
import { Observable, pipe, of, throwError,  } from 'rxjs';
import { $ } from 'protractor';


declare var toastr: any

@Injectable({
  providedIn: 'root'
})
export class UserService {

  loginResult:any = [];
  loginRole:any = [];
  loginToken:any = [];

  url:string = 'http://127.0.0.1:8000/api';

  userRole:any = [];

  private isAdminRole;

  constructor(
    private http:HttpClient
  ) { }

  Success(title: string,message?:string){
    toastr.success( title, message)
  }

  loginService(user:any){
    const data = {
      email:user.email,
      password:user.password
    }
    var userData = "email="+user.email+"&password="+user.password;

    const header = new HttpHeaders({'Content-type':'application/x-www-form-urlencoded','No-Auth':'True'});
    return this.http.post(`${this.url}/login`,userData,{headers:header})
    .pipe(
        map( result=>{
          this.loginResult = result;
          
          //store token
          this.loginToken = this.loginResult['success'].token;

          this.storeToken(this.loginToken);

          //get the role type
          this.loginRole = this.loginResult['success'].user.role;
          this.storeRole(this.loginRole)
        }),
        catchError(this.handleError)
    );
  }

  public getRole()
  {
       return this.loginRole;
  }

  errorHandler(error: HttpErrorResponse){
    console.log('Error is:',error);
    return throwError(error);
  }

  handleError(error: HttpErrorResponse)
  {
    // return throwError(error.message || "Server Error");
    return throwError(error);
  }

  storeToken(token:string){
    localStorage.setItem('token',token)
  }

  storeRole(role:any){
    localStorage.setItem('role',role)
  }

  getToken(){
    return localStorage.getItem("token");
  }

  getRolelog(){
    return localStorage.getItem("role");
  }

  public isAuthenticated(): boolean{
    return this.getToken() !== null;
  }


  registration(data:any){
    return this.http.post(`${this.url}/register`,data)
    .pipe(
      catchError(this.handleError)
    )
  }

  getUsers()
  {
    const header = new HttpHeaders({'Content-type':'application/x-www-form-urlencoded','No-Auth':'True'});
    return this.http.post(`${this.url}/getAllUsers`,{headers:header})
    .pipe(res=>res)

  }

  getUser()
  {
    const header = new HttpHeaders({ 'Content-type':'application/x-www-form-urlencoded','No-Auth':'True'});
    return this.http.post(`${this.url}/get-details`,{headers:header})
    .pipe(res=>res)
  }

  getRoles()
  {
    return this.http.get(`${this.url}/roles`)
    .pipe(res=>res)
  }

  geSingleUser(id){
    return this.http.get(`${this.url}/singleUser/edit/${id}`)
    .pipe(res=>res)
  }

  updataUserData(id,userData){
    let header = {
      headers:new HttpHeaders({'Content-Type':'application/json'})
    };
    return this.http.put(`${this.url}/updateUser/${id}`,userData,header)
    .pipe(res=>res);
  }

  deleteUser(id){
    return this.http.delete(`${this.url}/deleteUser/${id}`)
    .pipe(res=>res)
;  }


}

export interface User {
  id:number
  name: string;
  email: number;
}

