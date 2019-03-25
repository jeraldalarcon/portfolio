import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import { FormBuilder , FormGroup } from '@angular/forms';
import { CartService } from 'src/app/services/cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-show-detail',
  templateUrl: './show-detail.component.html',
  styleUrls: ['./show-detail.component.css']
})
export class ShowDetailComponent implements OnInit {

  data:any = [];
  detailsForm:FormGroup;
  response:any = [];
  errorMsg:string = '';
  messages:string = '';

  constructor(
    private activeRoute:ActivatedRoute,
    private productService:ProductService,
    private router:Router,
    private fb:FormBuilder,
    private cart:CartService,
    private toastr:ToastrService
  ) { }

  ngOnInit() {
    this.getSingleProduct(this.activeRoute.snapshot.params['id']);

    this.detailsForm = this.fb.group({
      product_name:'',
      product_price:0,
      product_image:'',
      product_id:0,

    });
  }

  fileChange(event){
    if(event.target.files.length > 0){
      const product_image = event.target.files[0];
      this.detailsForm.get('product_image').setValue(product_image);
    }
  };



  addItem(){

  const _formData = new FormData();
  _formData.append('product_name',this.detailsForm.get('product_name').value);
  _formData.append('product_id',this.detailsForm.get('product_id').value);
  _formData.append('product_price',this.detailsForm.get('product_price').value);
  _formData.append('product_image',this.detailsForm.get('product_image').value);

    this.cart.addItem(_formData)
    .subscribe(
      res =>{
        this.response = res;
        if(this.response == 'success')
        {
          this.router.navigate(['my-chart'])
        }else{
          this.messages = this.response;
          this.toastr.info(this.messages);
        }

      },
      error=>{
        this.errorMsg = error.statusText ;
        this.toastr.error(this.errorMsg);
        
       }
    )
  }

  getSingleProduct(id){
    this.productService.getSingleProduct(id)
    .subscribe(
      res=>{
        this.data =res;
        console.log('data',this.data)
      }
    )
  }


}
