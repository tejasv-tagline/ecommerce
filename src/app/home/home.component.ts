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
  public showData=[];
  // public tutorial: AngularFireObject<any>;

  constructor(private db: AngularFireDatabase) {
    this.allData = this.db.database.ref('/departments');
    // this.allData.on('value', (data: any) => {
    //   console.log('data.val() :>> ', data.val());
    //   data.val().forEach((element: any) => this.showData.push(element));


  }

  ngOnInit(): void {}

  public showFrontend(){
    this.allData.on('value',(data:any)=>{
      this.showData=data.val().frontend;
      console.log('this.showData :>> ', this.showData);
    })
  }

  public showBackend(){
    this.allData.on('value',(data:any)=>{
      this.showData=data.val().backend;
      console.log('this.showData :>> ', this.showData);
    })
  }
}
