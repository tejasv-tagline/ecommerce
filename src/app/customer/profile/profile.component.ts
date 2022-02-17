import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
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
  public myForm!:FormGroup;


  constructor(private db:AngularFireDatabase,private profileService:ProfileService,private fb:FormBuilder,private toaster:ToastrService) {
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

      console.log('this.userProfile.fName :>> ', this.userProfile);
      this.myForm=this.fb.group({
        fName:[this.userProfile?.fName || ''],
        lName:[this.userProfile?.lName || ''],
        address:[this.userProfile?.address || ''],
        pincode:[this.userProfile?.pincode || ''],
        mobile:[this.userProfile?.mobile || ''],
      })
    })

   }

  ngOnInit(): void {
    this.profileService.getUserProfile();
  }

  public onSubmit():void{
    console.log('this.userProfile.fName :>> ', this.userProfile);

    // console.log('this.myForm.value :>> ', this.myForm.value);
    const data={
      ...this.myForm.value,
      email:this.userProfile.email,
      role:this.userProfile.role,
      image:this.userProfile.image
    }
    console.log('data :>> ', data);
    this.profileService.updateProfile(data);
    this.toaster.success('Profile updated successfully');
  }
}
