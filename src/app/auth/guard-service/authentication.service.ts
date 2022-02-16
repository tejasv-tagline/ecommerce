import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  public token!: string | null;

  constructor() {
    this.token = localStorage.getItem('userid');
  }
  public getToken(): boolean {
    if (this.token) {
      return true;
    } else return false;
  }
}
