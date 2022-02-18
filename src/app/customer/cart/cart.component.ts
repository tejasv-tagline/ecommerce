import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CartService } from '../services/cart.service';
import { OrderService } from '../services/order.service';
import { ProfileService } from '../services/profile.service';

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
  public myForm!: FormGroup;
  public cartLen!: number;
  public allProfiles: any;
  public userProfile: any;

  constructor(
    private db: AngularFireDatabase,
    private cartService: CartService,
    private fb: FormBuilder,
    private orderService: OrderService,
    private toaster: ToastrService,
    private profileService: ProfileService
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
        (cart: any) => cart.userid === localStorage.getItem('userid')
      );
      this.cartLen = this.ownCartData.length;
      this.getOrderPrice();
    });
  }

  ngOnInit(): void {
    this.myForm = this.fb.group({
      name: [''],
      address: [''],
      pincode: [''],
      mobile: [''],
    });
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

  public onSubmit(cartId: string): void {
    const formData = {
      name:
        this.myForm.value.name ||
        this.userProfile?.fName + this.userProfile?.lName,
      address: this.myForm.value.address || this.userProfile?.address,
      pincode: this.myForm.value.pincode || this.userProfile?.pincode,
      mobile: this.myForm.value.mobile || this.userProfile?.mobile,
    };
    this.orderService.makeOrder(formData).then(() => {
      this.toaster.success('Order placed !');
    });
    this.orderService.removeCart();
  }

  public getFormValue(): void {
    const basePath = this.db.database.ref('/users/');
    basePath.on('value', (data: any) => {
      this.allProfiles = Object.keys(data.val()).map((key) => {
        return {
          ...data.val()[key],
          userid: key,
        };
      });
      this.userProfile = this.allProfiles.find(
        (element: any) => element.userid === localStorage.getItem('userid')
      );
    });
  }
}
