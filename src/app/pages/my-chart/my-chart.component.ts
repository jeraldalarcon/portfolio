import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { CartService } from 'src/app/services/cart.service';
import { FormGroup , FormBuilder} from '@angular/forms';
import { query } from '@angular/animations/src/animation_metadata';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-my-chart',
  templateUrl: './my-chart.component.html',
  styleUrls: ['./my-chart.component.css']
})
export class MyChartComponent implements OnInit {

  chart : any = [];
  myChart:any = [];
  total:any;
  itemCount:number;
  charTotal:number;
  item:any;
  total_per_item :any;
  result:string;

  totalPrice:string;

  constructor(
    private product:ProductService,
    private cartService:CartService,
    private fb:FormBuilder ,
    private router:Router,
    private toastr:ToastrService) { }

  ngOnInit() {

    this.chartData();

  }

  chartData(){
    this.cartService.getCart()
    .subscribe(
      res=>{
        this.myChart = res;
        this.itemCount = this.myChart.length;
        console.log('myCart',this.myChart);
     
      }
    );
  }

  deleteItem(id:number){
    this.cartService.deleteItem(id)
    .subscribe(
      res=>{
        this.myChart = res;
        this.toastr.success('Success deleted!');
        this.chartData();
      }
    )
  }


}
