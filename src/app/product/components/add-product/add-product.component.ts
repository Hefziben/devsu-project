import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { Actions, Select, Store, ofActionDispatched } from '@ngxs/store';
import { NgForm } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import { debounceTime, takeUntil } from 'rxjs/operators';
import { Product } from '../../..//models/product.model';
import { ProductState } from '../../../store/product.store';
import { AddProduct, AddProductSuccess, AddProductReset, ValidateProductId } from '../../../store/product.actions';
import { Destroyable } from '../../../shared/abstract/destroyable';
import { addYearsToDate, getCurrentDate } from '../../../util/date.util';
import { getDefaultProduct } from '../../../util/product.util';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent extends Destroyable implements OnInit, OnDestroy {

  @ViewChild('form', { static: false }) form: NgForm;
  @Select(ProductState.isProductIdExisting) isProductIdExisting$: Observable<boolean>;
  @Select(ProductState.validatingProductId) loading$: Observable<boolean>;
  product: Product;
  productIdValidation$ = new Subject<string>();
  currentDate = getCurrentDate();
  validating = false;

  constructor(private store: Store, private actions: Actions) {
    super();
  }

  ngOnInit(): void {
    this.resetValues()
    this.setupProductIdValidation();
    this.setupLoadingSubscription();
    this.setupAddProductSuccessSubscription();
  }


  resetValues(): void {
    this.resetFormIfNeeded();
    this.product = getDefaultProduct();
    this.store.dispatch(new AddProductReset());
  }

  onSubmit(): void {
    this.store.dispatch(new AddProduct(this.product));
  }

  onDateChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    const dateAdd = addYearsToDate(target.value);
    this.product.date_revision = dateAdd;
  }

  onProductIdChange(): void {
    this.validating = true;
    this.productIdValidation$.next(this.product.id);
  }

  private resetFormIfNeeded(): void {
    if (this.form) {
      this.form.resetForm();
    }
  }

  private setupProductIdValidation(): void {
    this.productIdValidation$
      .pipe(debounceTime(2000), takeUntil(this.destroy$))
      .subscribe((value) => {
        this.store.dispatch(new ValidateProductId(value));
      });
  }

  private setupLoadingSubscription(): void {
    this.loading$.pipe(takeUntil(this.destroy$)).subscribe((value: boolean) => {
      this.validating = value;
    });
  }

  private setupAddProductSuccessSubscription(): void {
    this.actions.pipe(ofActionDispatched(AddProductSuccess))
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.resetValues();
      });
  }
}
