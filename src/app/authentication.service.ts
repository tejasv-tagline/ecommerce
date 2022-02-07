import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { User } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  public userData:any;
  // public userData!: Observable<firebase.User>;
  constructor(private angularFireAuth: AngularFireAuth,private router:Router,private toaster:ToastrService) {
    this.userData = angularFireAuth.authState;
  }

  public SignUp(email: string, password: string) {
    this.angularFireAuth
      .createUserWithEmailAndPassword(email, password)
      .then((res) => {
        if(res.operationType==='signIn'){
          //  window.alert('SignUp successfull')
          this.toaster.success('Account created successfully..');
            this.router.navigate(['login']);
        }else{
          window.alert('SignUp failed');
          this.router.navigate(['signup']);
        }
        console.log('res :>> ', res);
      })
      .catch((err) => {
        this.toaster.error(err);
        console.log('err :>> ', err);
      });
  }

  public login(email:string,password:string){
    this.angularFireAuth.signInWithEmailAndPassword(email,password).then((res)=>{
      this.toaster.success('Login successfull !');
      if(res.additionalUserInfo){
        this.router.navigate(['home'])
        console.log('res :>> ', res);
      }
      else{
      }
    }).catch((err)=>{
      console.log('error is------ :>> ', err);
      this.toaster.error();
    })
  }
}
