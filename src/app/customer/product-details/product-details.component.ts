import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { ActivatedRoute } from '@angular/router';
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
    private cartService: CartService
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
      console.log('this.finalProductDetails :>> ', this.finalProductDetails);
    });
  }

  public addToCart(): void {
    // const cartBasePath = this.db.database.ref('/cart');
    // // cartBasePath.on('value',(data:any)=>{
    // //   let allCartsData=data.val();
    // //   console.log('allCartsData :>> ', allCartsData);
    // // })
    // cartBasePath.on('value', (data: any) => {
    //   let allCartsData: any = Object.keys(data.val()).map((key) => {
    //     return {
    //       ...data.val()[key],
    //       cartId: key,
    //     };
    //   });
    //   console.log('allCartsData :>> ', allCartsData);
    //   if (
    //     allCartsData.find((e: any) => {
    //       e.productId == this.finalProductDetails.productId;
    //     })
    //   ) {
    //     // const cartNewBasePath = this.db.database.ref(
    //     //   '/cart/' + allCartsData.cartId
    //     // );
    //     // cartNewBasePath.update((allCartsData.qty = allCartsData.qty + 1));
    //     window.alert('Product already added');
    //   } else {

    //   }
    // });
    const productData = {
      ...this.finalProductDetails,
      finalPrice: this.finalProductDetails.price * this.finalProductDetails.qty,
    };

    // console.log('Product data',productData);
    this.cartService.addToCart(productData);

  }
}
