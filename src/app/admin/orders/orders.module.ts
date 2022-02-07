import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrdersRoutingModule } from './orders-routing.module';
import { SuccessfulOrdersComponent } from './successful-orders/successful-orders.component';
import { PendingOrdersComponent } from './pending-orders/pending-orders.component';
import { ReturnOrdersComponent } from './return-orders/return-orders.component';


@NgModule({
  declarations: [
    SuccessfulOrdersComponent,
    PendingOrdersComponent,
    ReturnOrdersComponent
  ],
  imports: [
    CommonModule,
    OrdersRoutingModule
  ]
})
export class OrdersModule { }
