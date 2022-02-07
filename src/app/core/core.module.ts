import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { FooterComponent } from './footer/footer.component';
import { AdminHeaderComponent } from './admin-header/admin-header.component';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    FooterComponent,
    AdminHeaderComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports:[AdminHeaderComponent]
})
export class CoreModule { }
