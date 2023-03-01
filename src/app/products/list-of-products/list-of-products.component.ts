import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, map } from 'rxjs';
import { Product } from 'src/app/datatype';
import { FetchProduct } from 'src/app/shared/services/fetchProduct.service';

@Component({
  selector: 'app-list-of-products',
  templateUrl: './list-of-products.component.html',
  styleUrls: ['./list-of-products.component.css']
})
export class ListOfProductsComponent implements OnInit {
  allProductsList:Product[]=[];
  constructor(private fetch : FetchProduct, private http:HttpClient ,private route:Router) { }
  ngOnInit(): void {
   this.fetch.fetchProduct().subscribe((products)=>{
    this.allProductsList=products;
    console.log(this.allProductsList);
   });
  
}
  deleteProduct(id:string){
    this.fetch.deleteProduct(id).subscribe(()=>{
      const item = this.allProductsList.find(item => item.id === id);
       this.allProductsList.splice(this.allProductsList.indexOf(item));
    });
  }

}
