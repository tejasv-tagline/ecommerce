import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ProductsResolver } from '../resolver/products.resolver';
import { CartService } from '../services/cart.service';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  public basePath: any;
  public allProducts: any;
  public productDetails: any;

  constructor(
    private db: AngularFireDatabase,
    private cartService: CartService,
    private toaster: ToastrService
  ) {
    this.basePath = this.db.database.ref('/products');
    this.basePath.on('value', (data: any) => {
      this.allProducts = Object.keys(data.val()).map((key) => {
        return {
          ...data.val()[key],
          productId: key,
        };
      });
    });
  }

  ngOnInit(): void {}

  public addToCart(productId: string): void {
    this.productDetails = this.allProducts.find(
      (e: any) => e.productId == productId
    );
    const cartProduct = {
      ...this.productDetails,
      qty: 1,
    };
    this.cartService.checkCartProducts(productId, cartProduct);
    // this.toaster.show(this.productDetails.title+' was added to your cart');
    this.toaster.show(
      this.productDetails.title + ' was added to your cart',
      '',
      { positionClass: 'toast-bottom-center' }
    );
  }
}
