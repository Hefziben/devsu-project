import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductListComponent } from './product-list.component';
import { NgxsModule, Store } from '@ngxs/store';
import { GetProducts, GetProductsReset } from '../../../store/product.actions';
import { ProductState } from '../../../store/product.store';
import { of } from 'rxjs';
import { Product } from 'src/app/models/product.model';

const products: Product[] = [
  {
    name: 'Product 1',
    description: 'description 1',
    id: '1',
    logo: 'https://visa.com.ec/dam/VCOM/regional/lac/SPA/Default/Pay%20With%20Visa/Tarjetas/visa-signature-400x225.jpg',
    date_release: '2023-12-21T20:09:40.803+00:00',
    date_revision: '2024-12-21T20:09:40.803+00:00'
  },
  {
    name: 'Product 2',
    description: 'description 2',
    id: '2',
    logo: 'https://visa.com.ec/dam/VCOM/regional/lac/SPA/Default/Pay%20With%20Visa/Tarjetas/visa-signature-400x225.jpg',
    date_release: '2023-12-21T20:09:40.803+00:00',
    date_revision: '2024-12-21T20:09:40.803+00:00'
  }
];

class MockStore {
  dispatch = jest.fn();
  select = jest.fn((selector: any) => {
    if (selector === ProductState.getProducts) {
      return of(products);
    }
   return of([]);
  });
}

describe('ProductListComponent', () => {
  let component: ProductListComponent;
  let fixture: ComponentFixture<ProductListComponent>;
  let store: MockStore;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductListComponent ],
      imports:[NgxsModule.forRoot()],
      providers: [
        { provide: Store, useClass: MockStore },
      ],
    })
    .compileComponents();
    fixture = TestBed.createComponent(ProductListComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(Store) as unknown as MockStore;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });



  it('should dispatch GetProductsReset and GetProducts actions on ngOnInit', () => {
    component.ngOnInit();
    expect(store.dispatch).toHaveBeenCalledWith(new GetProductsReset());
    expect(store.dispatch).toHaveBeenCalledWith(new GetProducts());
  });

  it('should update totalItems and totalPages on products$ change', () => {
    const testProducts: Product[] = products;

    jest.spyOn(store, 'select').mockReturnValueOnce(of(testProducts));

    component.ngOnInit();

    expect(component.totalItems).toBe(products.length);
    expect(component.totalPages).toBe(Math.ceil(testProducts.length / component.itemsPerPage));
  });

  it('should update currentPage on onPageChange', () => {
    const pageNumber = 2;

    component.onPageChange(pageNumber);

    expect(component.currentPage).toBe(pageNumber);
  });

  it('should update itemsPerPage, currentPage, and totalPages on onItemsPerPageChange', () => {
    const itemsPerPage = 10;

    component.onItemsPerPageChange(itemsPerPage);

    expect(component.itemsPerPage).toBe(itemsPerPage);
    expect(component.currentPage).toBe(1);
    expect(component.totalPages).toBe(Math.ceil(component.totalItems / itemsPerPage));
  });

});
