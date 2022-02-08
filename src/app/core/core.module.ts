import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { FooterComponent } from './footer/footer.component';
import { AdminHeaderComponent } from './admin-header/admin-header.component';
import { RouterModule } from '@angular/router';
import { CustomerHeaderComponent } from './customer-header/customer-header.component';


@NgModule({
  declarations: [
    FooterComponent,
    AdminHeaderComponent,
    CustomerHeaderComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports:[AdminHeaderComponent,FooterComponent,CustomerHeaderComponent]
})
export class CoreModule { }
