import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductRoutingModule } from './product.routing.module';
import { AddProductComponent } from './components/add-product/add-product.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { SharedModule } from 'src/app/shared/share.module';
import { ProductComponent } from './pages/product.component';

@NgModule({
  declarations: [
    ProductComponent,
    AddProductComponent,
    ProductListComponent
  ],
  imports: [
    CommonModule,
    ProductRoutingModule,
    SharedModule
  ]
})
export class ProductModule { }
