import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/authentication.service';
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
    this.authService.SignUp(this.sendEmail,this.sendPassword);
    // this.router.navigate(['login']);
  }
}
