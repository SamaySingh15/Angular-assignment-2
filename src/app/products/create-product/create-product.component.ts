import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/datatype';
import { FetchProduct } from 'src/app/shared/services/fetchProduct.service';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css']
})
export class CreateProductComponent implements OnInit {
  updateEnable: boolean = false;
  isLoading: boolean = true;
  createProductform: FormGroup;
  productData: Product;
  productMessage: undefined | string;

  constructor(private http: HttpClient, private router: Router, private route: ActivatedRoute, private product: FetchProduct) { }

  ngOnInit(): void {
    let productId = this.route.snapshot.paramMap.get('id');
    this.updateEnable = productId != null ? true : false;
    this.initializeForm();
    if (this.updateEnable) {
      this.product.getProduct(productId).subscribe((data) => {
        this.productData = data
        this.createProductform.patchValue({
          name: this.productData.name,
          expiry: this.productData.expiry,
          stock: this.productData.stock,
          heading: this.productData.heading,
          subheading: this.productData.subheading,
          tags: this.productData.tags,
          description: this.productData.description
        });
        this.isLoading = !this.isLoading;
      });
    }
    else {
      this.isLoading = false;
    }
  }


  initializeForm(): void {

    this.createProductform = new FormGroup({
      name: new FormControl(null, [Validators.required ,Validators.maxLength(30)]),
      expiry: new FormControl(null, [Validators.required]),
      stock: new FormControl(null, [Validators.required, Validators.min(0) ]),
      heading: new FormControl(null,Validators.maxLength(150)),
      subheading: new FormControl(null,Validators.maxLength(160)),
      tags: new FormControl(),
      description: new FormControl(null,Validators.maxLength(250))
    })
  }

  onSubmit() {
    if (this.updateEnable) {
      this.product.updateProduct(this.createProductform.value).subscribe((res) => {
        if (res) {
          console.log("this method is called");
          this.productMessage = "Product has been updated";
        }
      });
      setTimeout(() => {
        this.productMessage = undefined;
        this.router.navigate(['/list-of-products']);
      }, 3000);
    }
    else {
      this.product.createProduct(this.createProductform.value).subscribe((res) => { console.log(res) });
      setTimeout(() => {
        this.router.navigate(['/list-of-products']);   // need to add the loader here 
      }, 2000);
      
    }
  }
}
