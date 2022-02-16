import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CrudService {
  public pushKey!:string;
  constructor(private db:AngularFireDatabase,private activatedRoute:ActivatedRoute) {
      
   }
}
