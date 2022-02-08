import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public userData: any;
  public allUsersData:any;
  public singleUserData:any;
  // public userData!: Observable<firebase.User>;
  constructor(
    private angularFireAuth: AngularFireAuth,
    private router: Router,
    private toaster: ToastrService,
    private db: AngularFireDatabase
  ) {
    this.userData = angularFireAuth.authState;
  }

  public SignUp(email: string, password: string): void {
    this.angularFireAuth
      .createUserWithEmailAndPassword(email, password)
      .then((res: any) => {
        // console.log('res :>> ', res);
        if (res.operationType === 'signIn') {
          if (res.additionalUserInfo) {
            const basePath = this.db.database.ref('/users');
            const data = {
              email: res.user?.multiFactor?.user?.email,
              role: 'customer',
            };
            basePath.push(data);
            // console.log('res :>> ', res);
            // this.toaster.success('Login successfull !');
            this.router.navigate(['dashboard']);
          }
          this.toaster.success('Account created successfully..');
          // this.router.navigate(['login']);
        } else {
          window.alert('SignUp failed');
          this.router.navigate(['signup']);
        }
        // console.log('res :>> ', res);
      })
      .catch((err) => {
        this.toaster.error(err);
      });
  }

  public login(email: string, password: string): void {
    this.angularFireAuth
      .signInWithEmailAndPassword(email, password)
      .then((res: any) => {
        if (res.additionalUserInfo) {
          const basePath = this.db.database.ref('/user');
          const data = {
            email: res.user?.multiFactor?.user?.email,
            role: 'admin',
          };
          // basePath.push(data);
          let allData: any;
          allData = this.db.database.ref('/users');
          // let data2:any;
          allData.on('value', (data: any) => {
            this.allUsersData = Object.keys(data.val()).map((key) => {
              return {
                ...data.val()[key],
                push_key: key,
              };
            });
            // let data5=data2.find((e:any)=> e.email == email);
            this.singleUserData=this.allUsersData.find((e:any)=>e.email==email)
            if(this.singleUserData.role==='customer'){
              this.router.navigate(['customer']);
            }
            else{
              this.router.navigate(['admin']);
            }
          });
        
          this.toaster.success('Login successfull !');
        } else {
        }
      })
      .catch((err) => {
        this.toaster.error();
      });
  }

  public getData(): void {
  }
}
