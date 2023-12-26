import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductComponent } from './pages/product.component';

const routes: Routes = [
  {
    path: '',
    component: ProductComponent,
    children: [
      {
        path: '',
        loadChildren:  () => import('./components/product-list/product-list.module').then( m => m.ProductListModule)
      },
      {
        path: 'agregar',
        loadChildren: () => import('./components/add-product/add-product.module').then(m => m.AddProductModule)
      }
    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductRoutingModule { }
