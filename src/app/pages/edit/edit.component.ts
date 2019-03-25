import { Component, OnInit ,NgModule} from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { HttpClient } from '@angular/common/http';
import { Router , ActivatedRoute} from '@angular/router';
import { FormGroup } from '@angular/forms/src/model';
import { FormBuilder } from '@angular/forms';


@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})

export class EditComponent implements OnInit {

  productImage:any;

  singleData:any = [];
  editForm:FormGroup;
  editDataList:any = [];
  loading:boolean = false;

  constructor(
    private productService:ProductService,
    private http:HttpClient,
    private activatedRoute:ActivatedRoute,
    private fb:FormBuilder
  ) { }

  ngOnInit() {  
    this.getData(this.activatedRoute.snapshot.params['id']);

    this.editForm = this.fb.group({
      product_name:'',
      product_description:'',
      product_price:0,
      product_image:''
    })
  }

  getData(id:number)
  {
    this.productService.getSingleData(id)
    .subscribe(
      res=>{
        this.singleData = res;
        console.log(this.singleData);
      }
    )
  }

  fileChange(event){
    if(event.target.files.length > 0){
      const product_image = event.target.files[0];
      this.productImage = product_image;
      // this.editForm.get('product_image').setValue(product_image);
      // console.log('product',product_image);
    }
  };
  

  updateData(){
    this.loading = true;

    let id = this.activatedRoute.snapshot.params['id'];

    let data = this.editForm.value;

    data.product_image = this.productImage;
    // const _formData = new FormData();
    // _formData.append('product_name',this.editForm.get('product_name').value);
    // _formData.append('product_description',this.editForm.get('product_description').value);
    // _formData.append('product_price',this.editForm.get('product_price').value);
    // _formData.append('product_image',this.editForm.get('product_image').value);
    
    console.log('data:',data);
    this.productService.editService(id,data)
    .subscribe(
      res =>{
        console.log('res result:',res);
        if(res){
          // window.location.href="/productList";
        }
        this.editDataList = res;
      }
    )
  }
  
}
