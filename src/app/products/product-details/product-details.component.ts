import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/datatype';
import { FetchProduct } from 'src/app/shared/services/fetchProduct.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  productDetails:Product;
  constructor(private route:ActivatedRoute ,private product: FetchProduct, private router:Router) { }

  ngOnInit(): void {
    let productId = this.route.snapshot.paramMap.get('id');
    this.product.getProduct(productId).subscribe((data)=>{
      this.productDetails=data;
    });

  }
  deleteProduct(id:string){
    this.product.deleteProduct(id).subscribe(()=>{
     console.log("product delelted");
      this.router.navigate(['/']);
    });
  }
  onEdit(){
    this.router.navigate([`/create-product/${this.productDetails.id}`]);
  }

}
