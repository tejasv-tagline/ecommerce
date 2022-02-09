import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { ActivatedRoute } from '@angular/router';
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
  public productDetails:any;

  constructor(private productService:ProductService,private activatedRoute:ActivatedRoute,private db:AngularFireDatabase,private cartService:CartService) {
    // this.allProducts = this.activatedRoute.snapshot.data['productsResolver'];
    // console.log('this.allProducts from dashboard :>> ', this.allProducts);
    this.basePath=this.db.database.ref('/products')
    this.basePath.on('value', (data: any) => {
      this.allProducts = Object.keys(data.val()).map((key) => {
        return {
          ...data.val()[key],
          push_key: key,
        };
      });
    });
  }
  
  ngOnInit(): void {
  }
  // public getProductDetails(): void {
  //   const basePath=this.db.database.ref('/cart');
  //   basePath.on('value', (data: any) => {
  //     this.productDetails = data.val();
  //     this.finalProductDetails={
  //       ...this.productDetails,
  //       qty:2
  //     }
  //     console.log('this.finalProductDetails :>> ', this.finalProductDetails);
  //   });
  // }

  // public addToCart():void{
  //   this.cartService.addToCart();
  // }

}
