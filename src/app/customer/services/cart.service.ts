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
  public elseNewBillCart: any;
  public isdisableDecrementButton: boolean = false;
  public getcartLength: number = 0;
  public cartArrayCheck: any = [];
  public cartVal: any;
  public allCarts: any;

  constructor(private db: AngularFireDatabase) {
    this.userId = localStorage.getItem('userid');
    this.basePath = this.db.database.ref('/cart');
  }

  public addToCart(productDetails: any): void {
    // this.checkCartProducts(productId);
    const cartData = {
      ...productDetails,
      userid: this.userId,
      finalPrice: productDetails.price * productDetails.qty,
    };
    this.basePath.push(cartData);
  }

  public getAllCarts(): void {
    this.cartArrayCheck = [];
    this.basePath.on('value', (data: any) => {
      this.allCarts = Object.keys(data.val()).map((key) => {
        return {
          ...data.val()[key],
          cartId: key,
        };
      });
    });
  }

  public findUpdateCart(productId: string): void {
    this.cartArrayCheck = this.allCarts.find(
      (element: any) =>
        element.productId === productId &&
        element.userid === localStorage.getItem('userid')
    );
  }

  public updateCart(): void {
    // Used to increase cart quantity whenever adding same product which is available in cart
    const basePath = this.db.database.ref(
      '/cart/' + this.cartArrayCheck.cartId
    );
    basePath.on('value', (data: any) => {
      this.cartVal = data.val();
    });
    const updateCartQuantity = {
      description: this.cartArrayCheck.description,
      finalPrice: this.cartArrayCheck.finalPrice,
      price: this.cartArrayCheck.price,
      productId: this.cartArrayCheck.productId,
      qty: this.cartArrayCheck.qty + 1,
      returnPeriod: this.cartArrayCheck.returnPeriod,
      title: this.cartArrayCheck.title,
      userid: this.cartArrayCheck.userid,
    };
    basePath.update(updateCartQuantity);

    // Used to increase cart finalprice whenever adding same product which is available in cart
    const basePathToUpdateFinalPrice = this.db.database.ref(
      '/cart/' + this.cartArrayCheck.cartId
    );
    basePathToUpdateFinalPrice.on('value', (data: any) => {
      this.cartVal = data.val();
    });
    const updateCartFinalPrice = {
      description: this.cartVal.description,
      finalPrice: this.cartVal.price * this.cartVal.qty,
      price: this.cartVal.price,
      productId: this.cartVal.productId,
      qty: this.cartVal.qty,
      returnPeriod: this.cartVal.returnPeriod,
      title: this.cartVal.title,
      userid: this.cartVal.userid,
    };
    basePath.update(updateCartFinalPrice);
  }

  public checkCartProducts(productId: string, productData: any): void {
    this.getAllCarts();
    this.findUpdateCart(productId);
    if (this.cartArrayCheck) {
      this.updateCart();
    } else {
      this.addToCart(productData);
    }
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
    // Used to plus or minus quantity from cart
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
