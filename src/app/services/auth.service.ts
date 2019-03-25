import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable , pipe } from 'rxjs';
import { map } from 'rxjs/operators';


import { User } from 'src/app/classes/user';
import { HttpClient , HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  url:string = 'http://127.0.0.1:8000/api';
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(private http:HttpClient) { 
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('token')));
  
    this.currentUser = this.currentUserSubject.asObservable();
    console.log('this.currentUser',this.currentUser);
  }


  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }


  login(user:any)
  {
    var userData = "email="+user.email+"&password="+user.password;
    const header = new HttpHeaders({'Content-type':'application/x-www-form-urlencoded','No-Auth':'True'});

    return this.http.post<any>(`${this.url}/login`,userData,{headers:header})
    .pipe(
      map(user=> {
          if(user['user'] && user.success['token']){
            localStorage.setItem('token',JSON.stringify(user.success['token']));
            let api = localStorage.getItem('currentUser');
            console.log('api:',api);
            console.log('user:',user);
            this.currentUserSubject.next(user);
          }

      return user;

      }));
  }

  logout()
  {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }


}
