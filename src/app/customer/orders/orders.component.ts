import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { ToastrService } from 'ngx-toastr';
import { OrderService } from '../services/order.service';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {
  public basePath:any;
  public fullCartValue:any;
  public orderId: any;

  constructor(public orderService:OrderService,private db:AngularFireDatabase,private toaster:ToastrService,private productService:ProductService) { 
      this.orderService.getCutomerOwnOrders().then(()=>{
      this.toaster.success('All orders fetched successfully');
    });

  }

  ngOnInit(): void {
  }

  public getOrderDetails(orderId:string):void{
    this.basePath=this.db.database.ref('/orders/'+orderId)
    this.basePath.on('value',(data:any)=>{
      this.fullCartValue=data.val().cartValue;
    })
    console.log('this.fullCartValue :>> ', this.fullCartValue);
    this.orderId=orderId;
  }
  
  public returnProduct(productId:string):void{
    console.log('ordeId :>> ', this.orderId);
    
    // this.productService.returnProduct(orderId,productId);
  }

}
