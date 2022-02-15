import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { OrderService } from '../services/order.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {
  public basePath:any;
  public fullCartValue:any;

  constructor(public orderService:OrderService,private db:AngularFireDatabase) { 
    this.orderService.getCutomerOwnOrders();
  }

  ngOnInit(): void {
  }

  public getOrderDetails(orderId:string):void{
    this.basePath=this.db.database.ref('/orders/'+orderId)
    this.basePath.on('value',(data:any)=>{
      this.fullCartValue=data.val().cartValue;
    })
    console.log('this.fullCartValue :>> ', this.fullCartValue);
  }

}
