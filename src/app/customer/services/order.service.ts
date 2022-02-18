import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import {
  getDatabase,
  ref,
  query,
  onValue,
  orderByValue,
  orderByChild,
  orderByKey
} from 'firebase/database';

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
  public ownCartToRemove: any;

  constructor(private db: AngularFireDatabase) {
    this.basePath = this.db.database.ref('/orders');
    this.cartBasePath = this.db.database.ref('/cart');
    this.userId = localStorage.getItem('userid');
  }

  public getOwnCart(): void {
    this.cartBasePath.on('value', (data: any) => {
      this.fullCartData = data.val();
      this.fullCartDataArray = Object.keys(data.val()).map((key) => {
        return {
          ...data.val()[key],
          cartId: key,
        };
      });
      this.ownCartData = this.fullCartDataArray.filter(
        (cart: any) => cart.userid === localStorage.getItem('userid')
      );
    });
  }

  public makeOrder(myForm: any): any {
    return new Promise<any>((resolve, reject) => {
      this.getOwnCart();
      this.basePath.push({
        ...myForm,
        userId: this.userId,
        cartValue: this.ownCartData,
      });
      resolve(true);
    });
  }

  public getCartToRemove(): void {
    this.cartBasePath.on('value', (data: any) => {
      this.fullCartData = data.val();
      this.fullCartDataArray = Object.keys(data.val()).map((key) => {
        return {
          ...data.val()[key],
          cartId: key,
        };
      });
      this.ownCartToRemove = this.fullCartDataArray.filter(
        (cart: any) => cart.userid === localStorage.getItem('userid')
      );
    });
  }

  public removeCart(): any {
    return new Promise<any>((resolve, reject) => {
      this.getCartToRemove();
      this.ownCartToRemove.forEach((element: any) => {
        const baseP = this.db.database.ref('/cart/' + element.cartId);
        baseP.remove();
      });
      const basePath = this.db.database.ref(
        '/cart/' + this.ownCartToRemove.cartId
      );
      basePath.on('value', (data: any) => {});
      resolve(true);
    });
  }

  public getCutomerOwnOrders(): any {
    // const db = getDatabase();
    // const starCountRef = ref(db, '/orders');
    // const topUserPostsRef = query(starCountRef,orderByChild("address"));

    // onValue(topUserPostsRef, (snapshot) => {
    //   const data = snapshot.val();
    //   console.log('data :>> ', data);
    // });

    return new Promise<void>((resolve, reject) => {
      this.basePath.on('value', (data: any) => {
        this.allOrders = Object.keys(data.val()).map((key) => {
          return {
            ...data.val()[key],
            orderId: key,
          };
        });
        const ownOrdersInAsc = this.allOrders.filter(
          (id: any) => id.userId === localStorage.getItem('userid')
        );
        this.ownOrders=ownOrdersInAsc.reverse();
      });
      resolve();
      reject('Not done');
    });
  }
}
