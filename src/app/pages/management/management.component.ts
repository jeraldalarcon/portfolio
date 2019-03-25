import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { MatTableDataSource ,MatSort, MatPaginator} from '@angular/material';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-management',
  templateUrl: './management.component.html',
  styleUrls: ['./management.component.css']
})
export class ManagementComponent implements OnInit {

  listData: MatTableDataSource<any>;
  displayedColumns :string[] = ['id','name','email','role','actions'];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  userList:any = [];

  user:any = [];

  errorMsg = '';

  deleteResponse:any = [];

  constructor(
    private userService:UserService,
    private router: Router,
    private toastr:ToastrService
  ) { }
  

  ngOnInit() {
    
    this.userData();
  }

  userData(){
    this.userService.getUsers()
    .subscribe(
      res=>{
        this.userList = res;
        this.listData = new MatTableDataSource(this.userList);
        this.listData.sort = this.sort;
        this.listData.paginator = this.paginator;
      },
      error=>{
        this.errorMsg = error.statusText ;
      }

    );
  }

  delete(id){
    this.userService.deleteUser(id)
    .subscribe(
      result=>{
        this.deleteResponse = result;
        this.toastr.success('Success');
        this.userData();
      },
      error=>{
        this.errorMsg = error.statusText ;
        this.toastr.error(this.errorMsg);
       }
    )
  }

}


