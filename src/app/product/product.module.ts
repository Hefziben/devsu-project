import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductRoutingModule } from './product.routing.module';
import { AddProductComponent } from './components/add-product/add-product.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { SharedModule } from '../shared/share.module';
import { ProductComponent } from './pages/product.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MenuDirective } from '../shared/directive/dropdown/drop-down-menu.directive';
import { ProductListRoutingModule } from './components/product-list/product-list.routing.module';

@NgModule({
  declarations: [
    ProductComponent,
    AddProductComponent
  ],
  imports: [
    CommonModule,
    ProductRoutingModule,
    ProductListRoutingModule,
    SharedModule,
    FormsModule,
    RouterModule]
})
export class ProductModule { }
