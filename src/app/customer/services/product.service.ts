import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  public basePath:any;
  public allProducts:any;
  
  
  constructor(private db:AngularFireDatabase) { 
    this.basePath = this.db.database.ref('/products');
  }

  public getAllProducts():any {
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
}
