import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { LoginComponent } from 'src/app/login/login.component';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import { UserService } from 'src/app/services/user.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.css']
})
export class ContainerComponent implements OnInit {

  dialogResult:any = [];

  list:any =[];
  isLoggedIn = true;
  
  constructor(
    private dialog:MatDialog,
    private router:Router,
    private productService:ProductService,
    private userServie:UserService,
    private toastr:ToastrService,
  ) { }

  ngOnInit() {
    this.getProductList();
  }

  Success(){
    this.toastr.info('successfully');
  }

  loginDialog(){
    let dialogRef = this.dialog.open(LoginComponent,{
      width:'500px',
      data:'Please log-in!'
    });

    dialogRef.afterClosed().subscribe(result =>{
      console.log(`Dialog closed: ${ result }`);
      this.dialogResult = result;
    })
  }

  getProductList(){
    this.productService.getAllProduct()
    .subscribe(
      (res)=>{
        this.list = res;
        console.log('LIST',this.list);
      }
    )
  }

  getLogIn()
  {
    if(!this.userServie.isAuthenticated()){
      return this.isLoggedIn = true;
       
    }
  }

  get hasUser()
  {
    return this.getLogIn();
  }

}
