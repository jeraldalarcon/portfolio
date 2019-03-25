import { Component, OnInit, NgModule } from '@angular/core';
import { FormGroup , FormBuilder , Validators} from '@angular/forms';
import { ProductService } from 'src/app/services/product.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})


export class AddComponent implements OnInit {

  addForm:FormGroup;
  response:any =[];
  myFile:File;
  errorMsg:string = '';
  loading:boolean = false;

  product_name:string;
  product_description:string;
  product_price:any;
  
  
  constructor(
    private fb:FormBuilder,
    private productService:ProductService,
    private router:Router,
    private toastr:ToastrService
  ) { }

  ngOnInit() {

    this.addForm = this.fb.group({
      product_name: ['', Validators.required],
      product_description :['', Validators.required],
      product_price:['', Validators.required],
      product_image:['', Validators.required]
    })
  }

  fileChange(event){
    if(event.target.files.length > 0){
      const product_image = event.target.files[0];
      this.addForm.get('product_image').setValue(product_image);
    }
  };

  addNew(){
    this.loading = true;
    const _formData = new FormData();
    _formData.append('product_name',this.addForm.get('product_name').value);
    _formData.append('product_description',this.addForm.get('product_description').value);
    _formData.append('product_price',this.addForm.get('product_price').value);
    _formData.append('product_image',this.addForm.get('product_image').value);

    this.productService.addService(_formData)
    .subscribe(
      (res)=>{
        this.response = res;
        console.log('this is response',this.response);
        this.router.navigate(['/productList']);
      },
      error=>{
        this.loading = true;
        this.errorMsg = error.statusText ;
        this.toastr.warning(this.errorMsg);
       }
    )
  }


}
