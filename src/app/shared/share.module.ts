import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './layout/header/header.component';
import { PaginationComponent } from './components/pagination/pagination.component';

@NgModule({
  declarations: [
    HeaderComponent,
    PaginationComponent,
  ],
  imports: [
    CommonModule
  ],
  exports: [
    HeaderComponent,
    PaginationComponent
  ]
})
export class SharedModule { }
