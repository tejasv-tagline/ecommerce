import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';

@Component({
  selector: 'app-view-all-product',
  templateUrl: './view-all-product.component.html',
  styleUrls: ['./view-all-product.component.scss'],
})
export class ViewAllProductComponent implements OnInit {
  public basePath: any;
  public allProduts:any=[];
  constructor(private db: AngularFireDatabase) {}

  ngOnInit(): void {
    this.basePath = this.db.database.ref('/products');
    // let allProducts=this.basePath.on('value', (data: any) => {
    //   data.val();
    // });

      this.basePath.on('value', (data: any) => {
      this.allProduts = Object.keys(data.val()).map((key) => {
        return {
          ...data.val()[key],
          push_key: key,
        };
      });
    console.log('allProducts :>> ',this.allProduts );
    })}
}
