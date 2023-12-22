import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddProductComponent } from './add-product.component';
import { Actions, NgxsModule, Store } from '@ngxs/store';
import { AddProduct, ValidateProductId } from '../../../store/product.actions';
import { Product } from '../../../models/product.model';
import { ProductState } from '../../../store/product.store';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { of } from 'rxjs';

let store: Store;
let actions$: Actions;
const product: Product =
{
  name: 'Product 2',
  description: 'description 2',
  id: '2',
  logo: 'https://visa.com.ec/dam/VCOM/regional/lac/SPA/Default/Pay%20With%20Visa/Tarjetas/visa-signature-400x225.jpg',
  date_release: '2023-12-21T20:09:40.803+00:00',
  date_revision: '2024-12-21T20:09:40.803+00:00'
};
describe('AddProductComponent', () => {
  let component: AddProductComponent;
  let fixture: ComponentFixture<AddProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddProductComponent],
      imports: [NgxsModule.forRoot([ProductState]), ReactiveFormsModule, HttpClientTestingModule, FormsModule, RouterModule],
      providers: [
        Actions,
        {
          provide: ActivatedRoute,
          useValue: {
            paramMap: of({ get: jest.fn() })
          },
        }],
    })
      .compileComponents();

    fixture = TestBed.createComponent(AddProductComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(Store);
    actions$ = TestBed.inject(Actions);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch AddProduct action on submit', () => {

    const addProductAction = new AddProduct(component.product);

    jest.spyOn(store, 'dispatch');

    component.onSubmit();
    expect(store.dispatch).toHaveBeenCalledWith(addProductAction);
  });


  it('should update product date_revision when onDateChange method is called', () => {
    const event = { target: document.createElement('input') };
    event.target.value = '2021-04-20T14:00';
    component.product = product;
    component.onDateChange(event as any);
    expect(component.product.date_revision).toBeTruthy();
  });

  it('should subscribe to productIdValidation$ and dispatch ValidateProductId', () => {
    jest.useFakeTimers();
    jest.spyOn(store, 'dispatch');
    const validateProductIdAction = new ValidateProductId('testProductId');
    component.productIdValidation$.next('testProductId');
    jest.runAllTimers();
    expect(store.dispatch).toHaveBeenCalledWith(validateProductIdAction);
  });

  it('should reset product when resetValues method is called', () => {
    const originalProduct = component.product;
    component.resetValues();
    expect(component.product).not.toEqual(originalProduct);
  });


});
