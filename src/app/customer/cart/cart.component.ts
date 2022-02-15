import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CartService } from '../services/cart.service';
import { OrderService } from '../services/order.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  public basePath: any;
  public fullCartData: any;
  public fullCartDataArray: any;
  public ownCartData: any;
  public changedCartData: any;
  public baseCartPath: any;
  public pushCartData: any;
  public newBillCart: any;
  public fullBillAmount!: number;
  public myForm!:FormGroup;


  constructor(
    private db: AngularFireDatabase,
    private cartService: CartService,
    private fb:FormBuilder,
    private orderService:OrderService
  ) {
    this.basePath = this.db.database.ref('/cart');
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
  }

  ngOnInit(): void {
      this.myForm=this.fb.group({
        name:[''],
        address:[''],
        pincode:[''],
        mobile:['']
      })
  }

  public changeQty(cartId: string, param: string): void {
    this.cartService.changeQty(cartId, param);
  }

  public getOrderPrice(): void {
    let orderPrice: any = [];
    this.ownCartData.filter((e: any) => {
      orderPrice.push(e.finalPrice);
    });
    this.fullBillAmount = eval(orderPrice.join('+'));
  }

  public removeProductFromCart(cartId: string) {
    this.cartService.removeProductFromCart(cartId);
  }

  public onSubmit():void{
    console.log('this.myForm.value :>> ', this.myForm.value);
    // this.orderService.getOwnCart();
    this.orderService.makeOrder(this.myForm.value);
  }

}
