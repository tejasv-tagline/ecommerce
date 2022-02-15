import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  AngularFireDatabase,
  AngularFireObject,
} from '@angular/fire/compat/database';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
// import firebase from 'firebase/compat/app';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public allData!: any;
  public showData = [];
  public data2: any[] = [];
  // public tutorial: AngularFireObject<any>;

  constructor(private db: AngularFireDatabase) {
    this.allData = this.db.database.ref('/product');
    // this.allData.push({fname:'fname'})

    this.allData.on('value', (data: any) => {
      this.data2 = Object.keys(data.val()).map((key) => {
        return {
          ...data.val()[key],
          push_key: key,
        };
      });
    });
  }

  deleteProduct() {
    const id: any = this.data2[0].push_key;
    const refPath = this.db.database.ref(`/product/${id}`);
    refPath.remove();
    // this.allData.dele
  }

  ngOnInit(): void {}

  public showFrontend() {
    this.allData.on('value', (data: any) => {
      this.showData = data.val().frontend;
    });
  }

  public showBackend() {
    this.allData.on('value', (data: any) => {
      this.showData = data.val().backend;
    });
  }
}
