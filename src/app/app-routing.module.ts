import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login/login.component';
import { CreateProductComponent } from './products/create-product/create-product.component';
import { ListOfProductsComponent } from './products/list-of-products/list-of-products.component';
import { ProductDetailsComponent } from './products/product-details/product-details.component';
import { QuickCreateProductComponent } from './products/quick-create-product/quick-create-product.component';
import { SettingsComponent } from './settings/settings/settings.component';
import { ErrorComponent } from './shared/components/error/error.component';

const routes: Routes = [
  {
    component:LoginComponent,
    path:''
  },
  {
    component:CreateProductComponent,
    path:'create-product'
  },
  {
    component:CreateProductComponent,
    path:'create-product/:id'
  },
  {
    component:QuickCreateProductComponent,
    path:'create-quick-product'
  },
  {
    component:SettingsComponent,
    path:'admin-settings'
  },
  {
    component:ListOfProductsComponent,
    path:'list-of-products'
  },
  {
    component:ProductDetailsComponent,
    path:'product-details/:id'
  },
  {
    path:'**' , component:ErrorComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
