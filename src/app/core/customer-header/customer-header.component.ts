import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';

@Component({
  selector: 'app-customer-header',
  templateUrl: './customer-header.component.html',
  styleUrls: ['./customer-header.component.scss'],
})
export class CustomerHeaderComponent implements OnInit {
  public basePath: any;
  public allCarts: any;
  public cartLength: any;
  public cartBadge: any = [];
  public cartBadgeLength!: number;

  constructor(private db: AngularFireDatabase) {
    this.basePath = this.db.database.ref('/cart');
    this.basePath.on('value', (data: any) => {
      this.allCarts = data.val();
      this.allCarts = Object.keys(data.val()).map((key) => {
        return {
          ...data.val()[key],
          productId: key,
        };
      });
      this.cartLength = this.allCarts.filter(
        (cart: any) => cart.userid === localStorage.getItem('userid')
      );
      // this.cartBadge = [];
      // this.cartLength.forEach((element: any) => {
      //   this.cartBadge.push(element.qty);
      // });
      // this.cartBadgeLength = eval(this.cartBadge.join('+'));
    });
  }

  ngOnInit(): void {}
}
