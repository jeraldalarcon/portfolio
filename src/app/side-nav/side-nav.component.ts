import { Component , OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { MatIcon } from '@angular/material';
import { UserService } from 'src/app/services/user.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css'],
})
export class SideNavComponent {

  role:any = [];
  public isRole = false;
  isLoggedIn = true;

  public user_log = false;

  notifyresult:any = [];

  hasLogout:boolean = true;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );

  constructor(private breakpointObserver: BreakpointObserver,private router:Router , private userService:UserService , private productService:ProductService) {

  }

  ngOnInit() {

    this.productService.productNotify()
    .subscribe(
      result =>{
        this.notifyresult = result;
        console.log(this.notifyresult);
      }
    )
  }

  logout(){
    localStorage.removeItem('token');
    this.router.navigateByUrl('');
  }

  get isAdmin() {
  
    if(this.userService.getRolelog() == '1'){
      this.isRole = true;
      return this.isRole;
    }
  }

  //hide and show nav side bar
  get showLog()
  {
    if(this.userService.isAuthenticated()){
      return this.user_log = true; 
    }
  }

  getLogIn()
  {
    if(!this.userService.isAuthenticated()){
      return this.isLoggedIn = true;  
      
    }
  }

  get hasUser()
  {
    return this.getLogIn();
  }


  get logoutCheck(){
    if(!this.userService.isAuthenticated()){
      return this.hasLogout = false; 
    }
  }


}
