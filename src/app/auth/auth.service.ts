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
  public allUsersData: any;
  public singleUserData: any;
  constructor(
    private angularFireAuth: AngularFireAuth,
    private router: Router,
    private toaster: ToastrService,
    private db: AngularFireDatabase
  ) {
    this.userData = angularFireAuth.authState;
  }

  public signUp(
    email: string,
    password: string,
    fName: string,
    lName: string,
    address: string,
    mobile: number,
    pincode: number
  ): void {
    this.angularFireAuth
      .createUserWithEmailAndPassword(email, password)
      .then((res: any) => {
        if (res.operationType === 'signIn') {
          if (res.additionalUserInfo) {
            const basePath = this.db.database.ref('/users');
            const data = {
              email: res.user?.multiFactor?.user?.email,
              role: 'customer',
              fName: fName,
              lName: lName,
              address: address,
              mobile: mobile,
              pincode: pincode,
              image: '',
            };
            basePath.push(data);
            this.router.navigate(['dashboard']);
          }
          this.toaster.success('Account created successfully..');
        } else {
          window.alert('SignUp failed');
          this.router.navigate(['signup']);
        }
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
          let allData: any;
          allData = this.db.database.ref('/users');
          allData.on('value', (data: any) => {
            this.allUsersData = Object.keys(data.val()).map((key) => {
              return {
                ...data.val()[key],
                push_key: key,
              };
            });
            this.singleUserData = this.allUsersData.find(
              (e: any) => e.email === email
            );
            if (this.singleUserData.role === 'customer') {
              localStorage.setItem('userid', this.singleUserData.push_key);
              this.router.navigate(['customer']);
            } else {
              localStorage.setItem('userid', this.singleUserData.push_key);
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

  public getData(): void {}
}
