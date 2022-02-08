import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss'],
})
export class AddProductComponent implements OnInit {
  public myForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private db: AngularFireDatabase,
    private toaster: ToastrService
  ) {
    this.myForm = this.fb.group({
      title: [''],
      description: [''],
      price: [''],
      returnPeriod: [''],
    });
  }

  ngOnInit(): void {}

  public onSubmit(): void {
    const basePath = this.db.database.ref('/products');
    basePath.push(this.myForm.value);
    this.toaster.success('Product added ..!');

    // console.log(this.myForm.value);
  }
}
