import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductListComponent } from './product-list.component';
import { ProductListRoutingModule } from './product-list.routing.module';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/share.module';
import { RouterModule } from '@angular/router';
import { MenuDirective } from 'src/app/shared/directive/dropdown/drop-down-menu.directive';

@NgModule({
  declarations: [ProductListComponent, MenuDirective],
  imports: [CommonModule, ProductListRoutingModule, FormsModule,SharedModule,
    FormsModule,
    RouterModule],
})
export class ProductListModule {}
