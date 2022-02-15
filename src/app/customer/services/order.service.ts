import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  public basePath: any;
  public userId: string | null;
  public fullCartData: any;
  public fullCartDataArray: any;
  public ownCartData: any;
  public cartBasePath: any;
  public cartValue: any = [];
  public allOrders: any;
  public ownOrders: any;

  constructor(private db: AngularFireDatabase) {
    this.basePath = this.db.database.ref('/orders');
    this.userId = localStorage.getItem('userid');
  }

  public getOwnCart(): void {
    this.cartBasePath = this.db.database.ref('/cart');
    this.cartBasePath.on('value', (data: any) => {
      this.fullCartData = data.val();
      this.fullCartDataArray = Object.keys(data.val()).map((key) => {
        return {
          ...data.val()[key],
          cartId: key,
        };
      });
      this.ownCartData = this.fullCartDataArray.filter(
        (cart: any) => cart.userid == localStorage.getItem('userid')
      );
    });
  }

  public makeOrder(myForm: any): void {
    this.getOwnCart();
    this.basePath.push({
      ...myForm,
      userId: this.userId,
      cartValue: this.ownCartData,
    });
  }

  public getCutomerOwnOrders(): void {
    this.basePath.on('value', (data: any) => {
      this.allOrders = Object.keys(data.val()).map((key) => {
        return {
          ...data.val()[key],
          orderId: key,
        };
      });
      console.log('allOrders:>> ', this.allOrders);
      this.ownOrders = this.allOrders.filter(
        (id: any) => id.userId == localStorage.getItem('userid')
        );
      console.log('this.ownOrders :>> ', this.ownOrders);
    });
  }
}
