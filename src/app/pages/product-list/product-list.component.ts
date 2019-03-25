import { Component, OnInit , ViewChild } from '@angular/core';
import { Product } from 'src/app/interfaces/product';
import { ProductService } from 'src/app/services/product.service';
import { Observable } from 'rxjs/internal/Observable';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { MatTableDataSource ,MatSort, MatPaginator} from '@angular/material';
import { FormGroup , FormBuilder ,Validators } from '@angular/forms';


@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})

export class ProductListComponent implements OnInit {

  searchForm:FormGroup;

  productList:any = [];

  listData: MatTableDataSource<any>;
  displayedColumns :string[] = ['id','product_name','product_image','product_price','url','user_id','actions'];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  list:any = [];
  deletedItem;
  del:any;
  x:any;
  notify:any;
  errorMsg:string ='';
  searchResult:any = [];

  constructor(
    private product:ProductService,
    private router:Router,
    private toastr:ToastrService,
    private fb:FormBuilder
  ) { }

  ngOnInit() {

    this.searchForm = this.fb.group({
      searchKey:['']
    })
    this.productData();

    this.allData();

    this.productNotify();
  }

  productData(){
  this.product.getProduct()
    .subscribe(
      res=>{
        this.productList = res;
        console.log('productList:',this.productList);

        this.listData = new MatTableDataSource(this.productList);
        this.listData.sort = this.sort;
        this.listData.paginator = this.paginator;
      }
    )
  }
  
  allData(){
    this.product.getProduct()
    .subscribe(
      (res)=>{
        this.list = res;
        console.log('list:',this.list);
      }
    )
  }

  productNotify()
  {
    this.product.productNotify()
    .subscribe(
      res=>{
        this.notify = res;
      console.log('res:',this.notify);
      }
      
    )
  }

  delete(id:any){
    this.product.deletedService(id)
    .subscribe(
      (res)=>{
        // window.location.href='/productList';
        
        this.toastr.success('Success');
        this.productData();
        return this.router.navigate(['/productList']);
      },
      error=>{
        this.errorMsg = error.statusText ;
        this.toastr.warning(this.errorMsg);
        
       }
    )
  }

  search(){
    let keyWord = this.searchForm.value;
    console.log('Keyword',keyWord);
    let data = new FormData();
    data.append('searchKey',this.searchForm.get('searchKey').value);
    this.product.search(data).
    subscribe(
      result =>{
        this.searchResult = result;
        console.log('searchResult:',this.searchResult);
      }
    )
    // this.searchResult = event.target.value;
  }


}
