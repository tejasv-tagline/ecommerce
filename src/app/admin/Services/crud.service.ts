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

  //  public updateDetails(myForm:any):void{
  //   this.pushKey=this.activatedRoute.snapshot.params['pushKey'];
  //   let basePath=this.db.database.ref('/products/'+this.pushKey);
  //   basePath.update(myForm);
  //  }
}
