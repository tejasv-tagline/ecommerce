import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ProfileService } from 'src/app/customer/services/profile.service';
import { AdminProfileService } from '../services/admin-profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  public basePath: any;
  public allUserProfile: any;
  public userProfile: any;
  public myForm!: FormGroup;

  constructor(
    private db: AngularFireDatabase,
    private adminProfileService: AdminProfileService,
    private fb: FormBuilder,
    private toaster: ToastrService
  ) {
    this.basePath = this.db.database.ref('/users');
    this.basePath.on('value', (data: any) => {
      this.allUserProfile = Object.keys(data.val()).map((key) => {
        return {
          ...data.val()[key],
          userid: key,
        };
      });
      this.userProfile = this.allUserProfile.find(
        (element: any) => element.userid === localStorage.getItem('userid')
      );
    });

    this.myForm = this.fb.group({
      fName: [this.userProfile?.fName || ''],
      lName: [this.userProfile?.lName || ''],
      address: [this.userProfile?.address || ''],
      pincode: [this.userProfile?.pincode || ''],
      mobile: [this.userProfile?.mobile || ''],
    });
  }

  ngOnInit(): void {
    this.adminProfileService.getUserProfile();
  }

  public onSubmit(): void {
    const data = {
      ...this.myForm.value,
      email: this.userProfile.email,
      role: this.userProfile.role,
      image: this.userProfile.image,
    };
    this.adminProfileService.updateProfile(data);
    this.toaster.success('Profile updated successfully');
  }
}
