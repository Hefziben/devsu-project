import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddProductComponent } from './components/add-product/add-product.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductComponent } from './pages/product.component';

const routes: Routes = [
  {
    path: '',
    component: ProductComponent,
    children: [
      {
        path: '',
        redirectTo: 'list',
        pathMatch: 'full'
      },
      {
        path: 'list',
        component: ProductListComponent
      },
      {
        path: 'add-product',
        component: AddProductComponent
      }
    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductRoutingModule { }
