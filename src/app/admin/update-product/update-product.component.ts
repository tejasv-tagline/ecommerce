import { AfterViewInit, Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AllProductList } from '../Interfaces/admin-common';
import { CrudService } from '../Services/crud.service';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.scss'],
})
export class UpdateProductComponent implements OnInit {
  public pushKey!: string;
  public basePath: any;
  public myForm!: FormGroup;
  public formData!: AllProductList;

  constructor(
    private activatedRoute: ActivatedRoute,
    private db: AngularFireDatabase,
    private fb: FormBuilder,
    private crudService: CrudService
  ) {
    this.pushKey = this.activatedRoute.snapshot.params['push_key'];
    this.basePath = this.db.database.ref('/products/' + this.pushKey);
    this.basePath.on('value', (data: any) => {
      this.formData = data.val();
    this.setvalueForm();

    });
  }

  ngOnInit(): void {
  this.setvalueForm();
  }

  setvalueForm(){
    this.myForm = this.fb.group({
      title: [this.formData?.title || ''],
      description: [this.formData?.description || ''],
      price: [this.formData?.price || ''],
      returnPeriod: [this.formData?.returnPeriod || ''],
    });
  }

  public updateProduct(): void {
    this.basePath.update(this.myForm.value);
    // this.crudService.updateDetails(this.myForm.value);
  }
}
