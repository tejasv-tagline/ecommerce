import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
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

  constructor(private authenticationService: AuthenticationService,private fb:FormBuilder) {
    this.myForm=this.fb.group({
      email:[''],
      password:['']
    })
  }

  ngOnInit(): void {
    // this.signUp();
  }

  public signUp(): void {
    this.sendEmail=this.myForm.value.email;
    this.sendPassword=this.myForm.value.password;
    this.authenticationService.SignUp(this.sendEmail,this.sendPassword);
  }
}
