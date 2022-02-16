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
        (cart: any) => cart.userid == localStorage.getItem('userid')
      );
    });
  }

  public makeOrder(myForm: any): any {
    // this.getOwnCart();
    // this.basePath.push({
    //   ...myForm,
    //   userId: this.userId,
    //   cartValue: this.ownCartData,
    // });
    return new Promise<any>((resolve, reject) => {
      this.getOwnCart();
      this.basePath.push({
        ...myForm,
        userId: this.userId,
        cartValue: this.ownCartData,
      });
      resolve(true);
    });
    // this.authService.login(loginform).then(() => {
    //   this.toastr.success('User login successfully');
    //   this.router.navigate(['welcome']);
    // }).catch(() => {
    //   this.toastr.error('Please enter valid email or password');
    // });

    // login(loginform) {
    //   return new Promise<any>((resolve, reject) => {
    //     this.afAuth.auth.signInWithEmailAndPassword(loginform.email, loginform.password).then((user) => {
    //       this.authState = user.user;
    //       resolve();
    //     }).catch((error) => {
    //       reject();
    //     });
    //   });
    // }
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
        (cart: any) => cart.userid == localStorage.getItem('userid')
      );
    });
  }
  
  public removeCart(): void {
    this.getCartToRemove();
    this.ownCartToRemove.forEach((element:any)=>{
      const baseP=this.db.database.ref('/cart/'+ element.cartId)
      baseP.on('value',(data:any)=>{
      })
      baseP.remove();
    })
    const basePath=this.db.database.ref('/cart/'+this.ownCartToRemove.cartId);
    basePath.on('value',(data:any)=>{
    })
  }

  public getCutomerOwnOrders(): void {
    this.basePath.on('value', (data: any) => {
      this.allOrders = Object.keys(data.val()).map((key) => {
        return {
          ...data.val()[key],
          orderId: key,
        };
      });
      this.ownOrders = this.allOrders.filter(
        (id: any) => id.userId == localStorage.getItem('userid')
      );
    });
  }
}
