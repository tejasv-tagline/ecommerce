import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  public adminOptions=[
    {
      title:'Add Product',
      text:'Click to add new product for sale',
      button:'Add',
      routerlink:'add-product'
    },
    {
      title:'View All Products',
      text:'Click to see all products',
      button:'View',
      routerlink:'view-all-product'
    }
  ]
  constructor() { }

  ngOnInit(): void {
  }

}
