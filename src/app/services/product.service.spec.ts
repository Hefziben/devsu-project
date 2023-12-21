import { TestBed } from '@angular/core/testing';
import { ProductService } from './product.service';
import { Product } from '../models/product.model';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

describe('ProductService', () => {
  let service: ProductService;
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

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(ProductService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get products', () => {
		const productsList: Product[] = products;
		jest.spyOn(service['http'], 'get').mockReturnValueOnce(of(productsList));

		service.getProducts().subscribe((res) => {
			expect(res).toEqual(productsList);
		});
	});
});
