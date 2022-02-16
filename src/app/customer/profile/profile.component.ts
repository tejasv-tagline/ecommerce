import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { ProfileService } from '../services/profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  public basePath:any;
  public allUserProfile:any;
  public userProfile:any;

  constructor(private db:AngularFireDatabase,private profileService:ProfileService) {
    this.basePath=this.db.database.ref('/users')
    this.basePath.on('value',(data:any)=>{
      this.allUserProfile = Object.keys(data.val()).map((key) => {
        return {
          ...data.val()[key],
          userid: key,
        };
      });
      this.userProfile=this.allUserProfile.find((element:any)=>
      element.userid===localStorage.getItem('userid'))
    })
   }

  ngOnInit(): void {
    this.profileService.getUserProfile();
  }

}
