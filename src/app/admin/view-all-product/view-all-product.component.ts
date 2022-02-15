import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { AllProductList } from '../Interfaces/admin-common';

@Component({
  selector: 'app-view-all-product',
  templateUrl: './view-all-product.component.html',
  styleUrls: ['./view-all-product.component.scss'],
})
export class ViewAllProductComponent implements OnInit {
  public basePath: any;
  public allProduts!: AllProductList[];
  constructor(private db: AngularFireDatabase) {}

  ngOnInit(): void {
    this.basePath = this.db.database.ref('/products');
    this.basePath.on('value', (data: any) => {
      this.allProduts = Object.keys(data.val()).map((key) => {
        return {
          ...data.val()[key],
          push_key: key,
        };
      });
    });
  }

  public deleteProduct(id: string): void {
    const basePath = this.db.database.ref('/products/' + id);
    basePath.remove();
  }
}
