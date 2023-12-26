import { Component, OnInit } from '@angular/core';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { ErrorService } from '../../../services/error/error.service';
import { ProductState } from '../../../store/product.store';

@Component({
  selector: 'app-error-modal',
  templateUrl: './error-modal.component.html',
  styleUrls: ['./error-modal.component.scss'],
})
export class ErrorPopupComponent implements OnInit {
  error: string;
  message$ = this.errorService.getErrorMessage();
  isVisible$ = this.errorService.isVisible$;
  errorMessage$ = this.errorService.errorMessage$;
  @Select(ProductState.getErrorMessage) error$: Observable<string>;
  constructor(
    private errorService: ErrorService
  ) { }

  ngOnInit(): void {
    this.errorMessage$.subscribe((message: string) => {
      this.error = message;
    });
  }

  onClose() {
    this.errorService.hideModal();
  }

}
