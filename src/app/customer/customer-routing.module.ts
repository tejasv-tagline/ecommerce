import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './cart/cart.component';
import { CustomerComponent } from './customer.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { OrdersComponent } from './orders/orders.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [
  {
    path:'',
    component:CustomerComponent,
    children:[
      {
        path:'',
        component:DashboardComponent
      },
      {
        path: 'dashboard',
        component: DashboardComponent,
      },
      {
        path: 'cart',
        component: CartComponent,
      },
      {
        path: 'orders',
        component: OrdersComponent,
      },
      {
        path: 'profile',
        component: ProfileComponent,
      },
      {
        path: 'product-details/:push_key',
        component: ProductDetailsComponent,
      },
      {
        path:'**',
        redirectTo:'dashboard'
      }
    ]
  }
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CustomerRoutingModule {}
