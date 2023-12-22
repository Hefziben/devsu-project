import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { Actions, Select, Store, ofActionDispatched } from '@ngxs/store';
import { NgForm } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import { debounceTime, takeUntil } from 'rxjs/operators';
import { Product } from '../../..//models/product.model';
import { ProductState } from '../../../store/product.store';
import { AddProduct, AddProductSuccess, AddProductReset, ValidateProductId, GetProductById, UpdateProduct } from '../../../store/product.actions';
import { Destroyable } from '../../../shared/abstract/destroyable';
import { addYearsToDate, getCurrentDate, getCurrentDateFromString } from '../../../util/date.util';
import { getDefaultProduct } from '../../../util/product.util';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent extends Destroyable implements OnInit, OnDestroy {

  @ViewChild('form', { static: false }) form: NgForm;
  @Select(ProductState.isProductIdExisting) isProductIdExisting$: Observable<boolean>;
  @Select(ProductState.validatingProductId) loading$: Observable<boolean>;
  @Select(ProductState.getSelectedProduct) selectedProduct$: Observable<Product>;
  product: Product;
  productId: string;
  selectedProduct: Product;
  productIdValidation$ = new Subject<string>();
  currentDate = getCurrentDate();
  validating = false;

  constructor(private store: Store, private actions: Actions, private route: ActivatedRoute) {
    super();
  }

  ngOnInit(): void {
    this.resetValues()
    this.getQueryParams();
    this.getSelectedProduct();
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


  updateProduct(): void {
    this.store.dispatch(new UpdateProduct(this.product));
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

  private getQueryParams(): void {
    this.route.queryParams.subscribe(params => {
      this.productId = params['id'];
      if (this.productId) {
        this.store.dispatch(new GetProductById(this.productId));
      }
    });
  }

  private getSelectedProduct(): void {
    this.selectedProduct$.pipe(takeUntil(this.destroy$)).subscribe( product => {
      this.selectedProduct = product;
      if (this.selectedProduct) {
        this.product = this.selectedProduct;
        const releaseDate = getCurrentDateFromString(this.product.date_revision);
        const revisionDate = addYearsToDate(releaseDate);
        this.product.date_release = releaseDate;
        this.product.date_revision = revisionDate;
      }
    });
  }

  get disableId(): boolean {
    return !!this.selectedProduct;
  }
}
