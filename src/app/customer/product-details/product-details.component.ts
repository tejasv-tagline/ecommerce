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
  public productReviews: any;
  public userName:any;
  public reviewUserName!:any;
  public starsArray:any=[]
  public userId=localStorage.getItem('userid');

  constructor(
    private activatedRoute: ActivatedRoute,
    private db: AngularFireDatabase,
    private cartService: CartService,
    private toaster: ToastrService
  ) {
    this.id = this.activatedRoute.snapshot.params['push_key'];
    this.basePath = this.db.database.ref('/products/' + this.id);
    this.getProductDetails();
  }

  ngOnInit(): void {}

  public getProductDetails(): void {
    this.basePath.on('value', (data: any) => {
      this.productDetails = data.val();
      const basePath=this.db.database.ref('/products/'+this.id+'/reviews')
      basePath.on('value',(data?:any)=>{
        var review=data?.val();
        if(review){
          this.productReviews = Object.keys(review).map((key) => {
            return {
              ...data.val()[key],
              reviewId: key,
            };
          });
        }

        })
      this.getUserName();
      this.finalProductDetails = {
        ...this.productDetails,
        qty: 1,
        productId: this.id,
      };
    });
  }

  public getUserName():void{
    this.productReviews?.forEach((i:any)=>{
      var basePath=this.db.database.ref('/users/'+i.userid)
      basePath.on('value',(data?:any)=>{
        this.userName=data.val()?.fName;
      })
    })
  }

  public addToCart(productId: string): void {
    const productData = {
      ...this.finalProductDetails,
    };
    this.cartService.checkCartProducts(productId, productData);
    this.toaster.show(
      this.productDetails.title + ' was added to your cart',
      '',
      { positionClass: 'toast-bottom-center' }
    );
    // this.toaster.show('was added to your cart',this.productDetails.title,{positionClass: 'toast-bottom-center'})
  }

  public submitReview(review: string, stars: any): void {
    const userPath=this.db.database.ref('/users/'+this.userId);
    userPath.on('value',(data:any)=>{
      this.reviewUserName=data.val();
      const basePath = this.db.database.ref('/products/' + this.id + '/reviews');
      this.starsArray=[];
      for(var i=0;i<stars;i++){
        this.starsArray.push(i)
      }
      const reviewData = {
        review,
        stars:this.starsArray,
        userName: this.reviewUserName.fName+ ' '+ this.reviewUserName.lName,
        userid:this.userId
      };
      // console.log('this.productReviews :>> ', this.productReviews);
      const checkReview=this.productReviews?.find((element:any)=>
        element.userid==this.userId
      )
      console.log('object :>> ', reviewData);
      if(checkReview){
        this.toaster.error('You have already submitted another review')
      }
      else{
        basePath.push(reviewData);
        this.toaster.success('Review added')
      }
    })
  }
}
