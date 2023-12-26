import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './layout/header/header.component';
import { PaginationComponent } from './components/pagination/pagination.component';
import { LoadingComponent } from './ui/loading/loading.component';
import { ErrorPopupComponent } from './ui/error-modal/error-modal.component';
import { ConfirmationModalComponent } from './ui/confirmation-modal/confirmation-modal.component';


@NgModule({
  declarations: [
    HeaderComponent,
    PaginationComponent,
    LoadingComponent,
    ErrorPopupComponent,
    ConfirmationModalComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    HeaderComponent,
    PaginationComponent,
    LoadingComponent,
    ErrorPopupComponent,
    ConfirmationModalComponent
  ]
})
export class SharedModule { }
