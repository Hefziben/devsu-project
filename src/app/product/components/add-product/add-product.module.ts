import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/share.module';
import { RouterModule } from '@angular/router';
import { AddProductRoutingModule } from './add-product.routing.module';
import { AddProductComponent } from './add-product.component';

@NgModule({
  declarations: [AddProductComponent],
  imports: [CommonModule, AddProductRoutingModule, FormsModule,SharedModule,
    FormsModule,
    RouterModule],
})
export class AddProductModule {}
