import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from 'src/app/authentication.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public myForm!:FormGroup;
  constructor(private fb:FormBuilder,private authService:AuthService,private toaster:ToastrService) {
    this.myForm=this.fb.group({
      email:['tejas21@gmail.com',[Validators.required,Validators.email]],
      password:['123456',[Validators.required,Validators.minLength(6)]],
    })
   }

  ngOnInit(): void {
  }

  get fControl(){
    return this.myForm.controls;
  }
  public onLogin():void {
    this.authService.login(this.myForm.value.email,this.myForm.value.password);
  }
}
