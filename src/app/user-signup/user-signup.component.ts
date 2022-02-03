import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-user-signup',
  templateUrl: './user-signup.component.html',
  styleUrls: ['./user-signup.component.scss'],
})
export class UserSignupComponent implements OnInit {
  public email!: string;
  public password!: string;

  constructor(private authenticationService: AuthenticationService) {}

  ngOnInit(): void {
    this.SignUp();
  }

  public SignUp(): void {
    this.email = 'tejasv.tagline@gmail.cosm';
    this.password = '123456';
    this.authenticationService.SignUp(this.email, this.password);
  }
}
