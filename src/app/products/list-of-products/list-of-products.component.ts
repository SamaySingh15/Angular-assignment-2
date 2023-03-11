import { HttpClient } from '@angular/common/http';
import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { AdminSettings, Product } from 'src/app/datatype';
import { FetchProduct } from 'src/app/shared/services/fetchProduct.service';
import { SettingService } from 'src/app/shared/services/setting.service';

@Component({
  selector: 'app-list-of-products',
  templateUrl: './list-of-products.component.html',
  styleUrls: ['./list-of-products.component.css']
})
export class ListOfProductsComponent implements OnInit {
  enteredSearchValue:string="";
  enableLoader:boolean=false;
  query:string="";
  allProductsList:Product[]=[];
  settings:AdminSettings;
  constructor(private fetch : FetchProduct, private http:HttpClient ,private route:Router ,private settingService:SettingService) { }
  ngOnInit(): void {
    this.enableLoader=true;
   this.fetch.fetchProduct().subscribe((products)=>{
    this.allProductsList=products;
    this.settingService.currentSettings.subscribe((res)=>{
      this.settings=res;
    });
   });
   this.enableLoader=false;
   
  
}
  deleteProduct(id:string){
    window.alert("are you sure you want to delete");
    this.fetch.deleteProduct(id).subscribe(()=>{
      /*const item = this.allProductsList.find(item => item.id === id);
       this.allProductsList.splice(this.allProductsList.indexOf(item)); */
       this.fetch.fetchProduct().subscribe((products)=>{
        this.allProductsList=products;
       })
    });
  }

  onProductSearch(query:string){
    setTimeout(() => {
      return this.fetch.fetchProduct().subscribe((res)=>{
        const products = res.filter((item) => item.name.toLowerCase().indexOf(this.query.toLowerCase())>-1 || item.heading?.toLowerCase().indexOf(this.query.toLowerCase())>-1 
         || item.subheading?.toLowerCase().indexOf(this.query.toLowerCase())>-1 ||
         item.tags?.toLowerCase().indexOf(this.query.toLowerCase())>-1);
         this.allProductsList=products;
       });
    }, 500);
  }

  onSelect(){
    for(let p of this.allProductsList){
     if(p.select){
       this.deleteProduct(p.id);
     }
    }
   }
   deleteAll(){
     this.fetch.deleteAllProducts().subscribe((res)=>{
       this.allProductsList=[];
     });
   }
}
