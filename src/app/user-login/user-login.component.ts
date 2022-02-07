import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.scss']
})
export class UserLoginComponent implements OnInit {
  public myForm!:FormGroup;
  constructor(private fb:FormBuilder,private authenticationService:AuthenticationService,private toaster:ToastrService) {
    this.myForm=this.fb.group({
      email:['tejasv.tagline@gmail.com',[Validators.required,Validators.email]],
      password:['123456',[Validators.required,Validators.minLength(6)]],
    })
   }

  ngOnInit(): void {
  }

  get fControl(){
    return this.myForm.controls;
  }
  public onLogin():void {
    this.authenticationService.login(this.myForm.value.email,this.myForm.value.password);
  }
}
