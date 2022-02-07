import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { FooterComponent } from './footer/footer.component';
import { AdminHeaderComponent } from './admin-header/admin-header.component';


@NgModule({
  declarations: [
    FooterComponent,
    AdminHeaderComponent
  ],
  imports: [
    CommonModule,
  ],
  exports:[AdminHeaderComponent]
})
export class CoreModule { }
