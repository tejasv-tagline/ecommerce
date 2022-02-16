import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  public sendEmail!: string;
  public sendPassword!: string;
  public myForm!:FormGroup;

  constructor(private authService:AuthService,private fb:FormBuilder,private router:Router) {
    this.myForm=this.fb.group({
      fName:[''],
      lName:[''],
      mobile:[''],
      // gender:[''],
      address:[''],
      pincode:[''],
      email:['',[Validators.required,Validators.email]],
      password:['',[Validators.required,Validators.minLength(6)]],
      // mobile:['']
    })
  }

  ngOnInit(): void {
    // this.signUp();
  }
  get fControl(){
    return this.myForm.controls;
  }

  public signUp(): void {
    // const contact=this.myForm.value.mobile;
    this.sendEmail=this.myForm.value.email;
    this.sendPassword=this.myForm.value.password;
    const fName=this.myForm.value.fName;
    const lName=this.myForm.value.lName;
    const mobile=this.myForm.value.mobile;
    const address=this.myForm.value.address;
    const pincode=this.myForm.value.pincode;
    
    this.authService.signUp(this.sendEmail,this.sendPassword,fName,lName,mobile,address,pincode);
    console.log('this.myForm.value :>> ', this.myForm.value);
    // this.router.navigate(['login']);
  }
}
