import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrdersComponent } from './orders.component';
import { PendingOrdersComponent } from './pending-orders/pending-orders.component';
import { ReturnOrdersComponent } from './return-orders/return-orders.component';
import { SuccessfulOrdersComponent } from './successful-orders/successful-orders.component';

const routes: Routes = [{
  path:'',
  component:OrdersComponent,
  children:[
    {
      path:'successful-orders',
      component:SuccessfulOrdersComponent
    },
    {
      path:'pending-orders',
      component:PendingOrdersComponent
    },
    {
      path:'return-orders',
      component:ReturnOrdersComponent
    },
    {
      path:'**',
      component:SuccessfulOrdersComponent
    },
    
  ]
}
 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrdersRoutingModule { }
