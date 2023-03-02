import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';
import { Product } from 'src/app/datatype';

@Injectable({
  providedIn: 'root'
})
export class FetchProduct {

  constructor(private http: HttpClient) { }
  fetchProduct() {
    return this.http.get<{ [key: string]: Product }>('https://angular-assignment-2-25c2c-default-rtdb.firebaseio.com/products.json').pipe(map((res) => {
      const products = [];
      for (const key in res) {
        if (res.hasOwnProperty(key)) {
          products.push({ ...res[key], id: key ,select:false })
        }
      }
      return products;
    }));
  }

  createProduct(product: Product) {
    return this.http.post<{ name: string }>('https://angular-assignment-2-25c2c-default-rtdb.firebaseio.com/products.json', product);
  }
  getProduct(id: string) {
    return this.http.get<Product>('https://angular-assignment-2-25c2c-default-rtdb.firebaseio.com/products/' + id + '.json');
  }

  updateProduct(product: Product) {
    return this.http.put<Product>('https://angular-assignment-2-25c2c-default-rtdb.firebaseio.com/products/' + product.id + '.json', product);
  }

  deleteProduct(id: string) {
    return this.http.delete('https://angular-assignment-2-25c2c-default-rtdb.firebaseio.com/products/' + id + '.json');
  }
  deleteAllProducts(){
    return this.http.delete('https://angular-assignment-2-25c2c-default-rtdb.firebaseio.com/products.json');
  }

}
