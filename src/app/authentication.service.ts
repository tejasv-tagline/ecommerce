import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  public userData!: any;
  // public userData!: Observable<firebase.User>;
  constructor(private angularFireAuth:AngularFireAuth) { 
    this.userData=angularFireAuth.authState;
  }

  SignUp(email:string,password:string){
    this.angularFireAuth.createUserWithEmailAndPassword(email,password).then(res => {
      console.log('res :>> ', res);
    }).catch(err => {
      console.log('err :>> ', err);
    });
  }
}
