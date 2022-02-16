import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  public basePath: any;
  public allProfiles: any;
  public userProfile: any;

  constructor(private db: AngularFireDatabase) {
    this.basePath = this.db.database.ref('/users');
  }

  public getUserProfile(): void {
    this.basePath.on('value', (data: any) => {
      this.allProfiles = Object.keys(data.val()).map((key) => {
        return {
          ...data.val()[key],
          userid: key,
        };
      });
      // console.log('localstorage.getItem(userid) :>> ', localStorage.getItem('userid'));
      // console.log('this.allProfiles :>> ', this.allProfiles);
      this.userProfile = this.allProfiles.find(
        (element: any) => element.userid == localStorage.getItem('userid')
      );
      // this.userProfile = this.allProfiles.find(
      //   (e: any) => e.email == email
      // );
      console.log('this.userProfile :>> ', this.userProfile);
      return this.userProfile;
      
    });
  }
}
