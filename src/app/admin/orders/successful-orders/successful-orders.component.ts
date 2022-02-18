import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';

@Component({
  selector: 'app-successful-orders',
  templateUrl: './successful-orders.component.html',
  styleUrls: ['./successful-orders.component.scss'],
})
export class SuccessfulOrdersComponent implements OnInit {
  public basePath: any;
  public allOrders: any;
  public orderDetails: any;

  constructor(private db: AngularFireDatabase) {
    this.basePath = this.db.database.ref('/orders');
    this.basePath.on('value', (data: any) => {
      var allOrdersInAsc = Object.keys(data.val()).map((key) => {
        return {
          ...data.val()[key],
          productId: key,
        };
      });
      this.allOrders=allOrdersInAsc.reverse();
    });
  }

  ngOnInit(): void {}

  public getCartValue(productId: string): void {
    const basePath = this.db.database.ref('/orders/' + productId);
    basePath.on('value', (data: any) => {
      this.orderDetails = data.val().cartValue;
    });
  }
}
