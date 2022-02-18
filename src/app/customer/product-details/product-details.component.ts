import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CartService } from '../services/cart.service';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
})
export class ProductDetailsComponent implements OnInit {
  public basePath: any;
  public id!: string;
  public productDetails: any;
  public pushProductToCart: any;
  public finalProductDetails: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private db: AngularFireDatabase,
    private cartService: CartService,
    private toaster:ToastrService
  ) {
    this.id = this.activatedRoute.snapshot.params['push_key'];
    this.basePath = this.db.database.ref('/products/' + this.id);
    this.getProductDetails();
  }

  ngOnInit(): void {}

  public getProductDetails(): void {
    this.basePath.on('value', (data: any) => {
      this.productDetails = data.val();
      this.finalProductDetails = {
        ...this.productDetails,
        qty: 1,
        productId: this.id,
      };
    });
  }

  public addToCart(productId:string): void {
    const productData = {
      ...this.finalProductDetails,
    };
    this.cartService.checkCartProducts(productId,productData);
    this.toaster.show(this.productDetails.title+' was added to your cart','',{positionClass:'toast-bottom-center'});
    // this.toaster.show('was added to your cart',this.productDetails.title,{positionClass: 'toast-bottom-center'})
  }
}
