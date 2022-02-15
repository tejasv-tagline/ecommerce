import { Injectable, QueryList } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  public userId: any;
  public basePath: any;
  public fullCartData: any;
  public fullCartDataArray: any;
  public ownCartData: any;
  public changedCartData: any;
  public baseCartPath: any;
  public pushCartData: any;
  public newBillCart: any;
  public fullBillAmount!: number;
  // public qtyLessThen1:boolean=false;
  public elseNewBillCart: any;
  public isdisableDecrementButton: boolean = false;
  public getcartLength: number = 0;

  constructor(private db: AngularFireDatabase) {
    this.userId = localStorage.getItem('userid');
    this.basePath = this.db.database.ref('/cart');
  }

  public addToCart(productDetails: any): void {
    const cartData = {
      ...productDetails,
      userid: this.userId,
      finalPrice: productDetails.price * productDetails.qty,
    };
    this.basePath.push(cartData);
  }

  public getOwnCart(): void {
    // this.basePath = this.db.database.ref('/cart');
    this.basePath.on('value', (data: any) => {
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
      this.getOrderPrice();
    });
    return this.ownCartData;
  }

  public changeQty(cartId: string, param: string): void {
    this.getOwnCart();
    this.changedCartData = this.ownCartData.find(
      (e: any) => e.cartId == cartId
    );

    this.baseCartPath = this.db.database.ref(
      '/cart/' + this.changedCartData.cartId
    );

    this.pushCartData = {
      cartId: this.changedCartData.cartId,
      description: this.changedCartData.description,
      finalPrice: this.changedCartData.finalPrice,
      price: this.changedCartData.price,
      qty: this.changedCartData.qty,
      returnPeriod: this.changedCartData.returnPeriod,
      title: this.changedCartData.title,
      userid: this.changedCartData.userid,
    };

    if (param === 'plus') {
      let dummyCartData = {
        cartId: this.changedCartData.cartId,
        description: this.changedCartData.description,
        finalPrice: this.changedCartData.finalPrice,
        price: this.changedCartData.price,
        qty: this.changedCartData.qty + 1,
        returnPeriod: this.changedCartData.returnPeriod,
        title: this.changedCartData.title,
        userid: this.changedCartData.userid,
      };

      this.baseCartPath.update(dummyCartData);
      let passData = {
        cartId: this.changedCartData.cartId,
        description: this.changedCartData.description,
        finalPrice: this.changedCartData.price * dummyCartData.qty,
        price: this.changedCartData.price,
        qty: dummyCartData.qty,
        returnPeriod: this.changedCartData.returnPeriod,
        title: this.changedCartData.title,
        userid: this.changedCartData.userid,
      };
      this.baseCartPath.update(passData);
      this.getOrderPrice();

      // this.pushCartData.qty=this.pushCartData.qty+1;
      // this.baseCartPath.update(this.pushCartData);
      this.baseCartPath.on('value', (data: any) => {
        this.newBillCart = data.val();
      });
    } else {
      this.baseCartPath.on('value', (data: any) => {
        this.elseNewBillCart = data.val();
      });

      let dummyCartData = {
        cartId: this.changedCartData.cartId,
        description: this.changedCartData.description,
        finalPrice: this.changedCartData.finalPrice,
        price: this.changedCartData.price,
        qty: this.changedCartData.qty - 1,
        returnPeriod: this.changedCartData.returnPeriod,
        title: this.changedCartData.title,
        userid: this.changedCartData.userid,
      };
      this.baseCartPath.update(dummyCartData);

      let passData = {
        cartId: this.changedCartData.cartId,
        description: this.changedCartData.description,
        finalPrice: this.changedCartData.price * dummyCartData.qty,
        price: this.changedCartData.price,
        qty: dummyCartData.qty,
        returnPeriod: this.changedCartData.returnPeriod,
        title: this.changedCartData.title,
        userid: this.changedCartData.userid,
      };
      // this.pushCartData.qty=this.pushCartData.qty - 1;
      // this.baseCartPath.update(this.pushCartData);
      this.baseCartPath.update(passData);
      this.baseCartPath.on('value', (data: any) => {
        this.newBillCart = data.val();
      });
      this.getOrderPrice();
    }
  }

  public getCartLen(): void {
    this.basePath.on('value', (data: any) => {
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
      this.getcartLength = this.ownCartData.length;
    });
  }

  public removeProductFromCart(cartId: string): void {
    const removeBasePath = this.db.database.ref('/cart/' + cartId);
    removeBasePath.remove();
  }

  public getOrderPrice(): void {}
}
