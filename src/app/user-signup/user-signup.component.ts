import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-user-signup',
  templateUrl: './user-signup.component.html',
  styleUrls: ['./user-signup.component.scss'],
})
export class UserSignupComponent implements OnInit {
  public sendEmail!: string;
  public sendPassword!: string;
  public myForm!:FormGroup;

  constructor(private authenticationService: AuthenticationService,private fb:FormBuilder,private router:Router) {
    this.myForm=this.fb.group({
      email:['',[Validators.required,Validators.email]],
      password:['',[Validators.required,Validators.minLength(6)]]
    })
  }

  ngOnInit(): void {
    // this.signUp();
  }
  get fControl(){
    return this.myForm.controls;
  }

  public signUp(): void {
    this.sendEmail=this.myForm.value.email;
    this.sendPassword=this.myForm.value.password;
    this.authenticationService.SignUp(this.sendEmail,this.sendPassword);
    // this.router.navigate(['login']);
  }
}
