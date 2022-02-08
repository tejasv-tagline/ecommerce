import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  public basePath: any;
  public allProducts: any;

  constructor(private db: AngularFireDatabase) {

    this.basePath = this.db.database.ref('/products');
    this.basePath.on('value', (data: any) => {
      this.allProducts = Object.keys(data.val()).map((key) => {
        return {
          ...data.val()[key],
          push_key: key,
        };
      });
      // this.allProducts=data.val();
      console.log('this.allProducts :>> ', this.allProducts);
    });
  }

  ngOnInit(): void {

  }

}
