import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserLoginComponent } from '../user-login/user-login.component';
import { AddProductComponent } from './add-product/add-product.component';

import { DashboardComponent } from './dashboard/dashboard.component';
import { ProfileComponent } from './profile/profile.component';
import { ViewAllProductComponent } from './view-all-product/view-all-product.component';

const routes: Routes = [
  {
    path:'dashboard',
    component:DashboardComponent
  },
  {
    path:'login',
    component:UserLoginComponent
  },
  {
    path:'profile',
    component:ProfileComponent
  },
  {
    path:'add-product',
    component:AddProductComponent
  },
  {
    path:'view-all-product',
    component:ViewAllProductComponent
  },
  {
    path:'orders',
    loadChildren:()=>import('../admin/orders/orders.module').then(m=>m.OrdersModule)
  },
  {
    path:'**',
    redirectTo:'dashboard'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
