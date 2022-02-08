import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  public userId: any;
  public basePath: any;

  constructor(private db: AngularFireDatabase) {
    this.userId = localStorage.getItem('userid');
    this.basePath = this.db.database.ref('/cart');
  }

  public addToCart(productDetails: any): void {
    const cartData = {
      ...productDetails,
      userid: this.userId,
    };
    this.basePath.push(cartData);
  }
}
