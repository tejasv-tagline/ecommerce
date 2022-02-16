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
      this.userProfile = this.allProfiles.find(
        (element: any) => element.userid == localStorage.getItem('userid')
      );
      return this.userProfile;
      
    });
  }
}
