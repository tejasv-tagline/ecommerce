import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  public basePath: any;
  public allProducts: any;
  public productDetails: any;
  public productReviews: any;
  public finalProductDetails: any;
  public userId=localStorage.getItem('userid');
  public reviewUserName:any;
  public starsArray:any=[];
  public fullCartValue:any;

  constructor(private db: AngularFireDatabase,public toaster:ToastrService) {
    this.basePath = this.db.database.ref('/products');
  }

  public getAllProducts(): any {
    this.basePath.on('value', (data: any) => {
      this.allProducts = Object.keys(data.val()).map((key) => {
        return {
          ...data.val()[key],
          push_key: key,
        };
      });
    });
    return this.allProducts;
  }

  public submitReview(review: string, stars: any,productId:any): void {
    const userPath=this.db.database.ref('/users/'+this.userId);
    userPath.on('value',(data:any)=>{
      this.reviewUserName=data.val();
      const basePath = this.db.database.ref('/products/' + productId + '/reviews');
      // basePath.on('value',(data:any)=>{
      //   this.allProducts = Object.keys(data.val()).map((key) => {
      //     return {
      //       ...data.val()[key],
      //       productId: key,
      //     };
      //   });
      // })
      // const basePath=this.db.database.ref('/products/'+this.id+'/reviews')
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
      const checkReview=this.productReviews?.find((element:any)=>
        element.userid==this.userId
      )
      if(checkReview){
        this.toaster.error('You have already submitted another review')
      }
      else{
        basePath.push(reviewData);
        this.toaster.success('Review added')
      }
    })
  }

  public getProductDetails(productId: string):any {
    return new Promise<void> ((resolve,reject)=>{
      const basePath=this.db.database.ref('/products/'+productId);
      basePath.on('value', (data: any) => {
        this.productDetails = data.val();
        console.log('this.productDetails :>> ', this.productDetails);
        this.getAllReviews(productId);
        this.getUserName();
        this.finalProductDetails = {
          ...this.productDetails,
          qty: 1,
          productId: productId,
        };
      });
      resolve();
      reject('not done')
    })
      
  }

  // this.basePath.on('value', (data: any) => {
  //   this.productDetails = data.val();
  //   const basePath=this.db.database.ref('/products/'+this.id+'/reviews')
  //   basePath.on('value',(data?:any)=>{
  //     var review=data?.val();
  //     if(review){
  //       this.productReviews = Object.keys(review).map((key) => {
  //         return {
  //           ...data.val()[key],
  //           reviewId: key,
  //         };
  //       });
  //     }

  //     })
  //   this.getUserName();
  //   this.finalProductDetails = {
  //     ...this.productDetails,
  //     qty: 1,
  //     productId: this.id,
  //   };
  // });




  public getAllReviews(productId:string):void{
    const basePath = this.db.database.ref(
      '/products/' + productId + '/reviews'
    );
    basePath.on('value', (data?: any) => {
      var review = data?.val();
      if (review) {
        this.productReviews = Object.keys(review).map((key) => {
          return {
            ...data.val()[key],
            reviewId: key,
          };
        });
        // console.log('this.productReviews :>> ', this.productReviews);
      }
    });
  }



  public getUserName(): void {}

  public returnProduct(orderId:string,productId:string):void{
    const basePath=this.db.database.ref('/orders/'+orderId)
    this.basePath.on('value',(data:any)=>{
      this.fullCartValue=data.val().cartValue;
    })
    console.log('this.fullCartValue :>> ', this.fullCartValue);
  }
}
