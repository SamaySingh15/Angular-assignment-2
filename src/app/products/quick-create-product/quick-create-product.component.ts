import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-quick-create-product',
  templateUrl: './quick-create-product.component.html',
  styleUrls: ['./quick-create-product.component.css']
})
export class QuickCreateProductComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  onProductCreate(form: NgForm){
    console.log(form);
  }

}
