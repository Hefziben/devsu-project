import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductRoutingModule } from './product.routing.module';
import { SharedModule } from '../shared/share.module';
import { ProductComponent } from './pages/product.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ProductListRoutingModule } from './components/product-list/product-list.routing.module';
import { AddProductRoutingModule } from './components/add-product/add-product.routing.module';

@NgModule({
  declarations: [
    ProductComponent,
  ],
  imports: [
    CommonModule,
    ProductRoutingModule,
    ProductListRoutingModule,
    AddProductRoutingModule,
    SharedModule,
    FormsModule,
    RouterModule]
})
export class ProductModule { }
