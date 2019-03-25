import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';
import { ProductChartListDataSource } from './product-chart-list-datasource';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-chart-list',
  templateUrl: './product-chart-list.component.html',
  styleUrls: ['./product-chart-list.component.css'],
})
export class ProductChartListComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(ProductService) product: ProductService;
  dataSource: ProductChartListDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id','product_name','product_image','url','user_id'];

  ngOnInit() {
    this.dataSource = new ProductChartListDataSource(this.paginator, this.sort, this.product);
  }
}
