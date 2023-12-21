import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable, takeUntil } from 'rxjs';
import { Product } from '../../../models/product.model';
import { Destroyable } from '../../../shared/abstract/destroyable';
import { GetProducts, GetProductsReset } from '../../../store/product.actions';
import { ProductState } from '../../../store/product.store';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent extends Destroyable implements OnInit {
  // product selector
  @Select(ProductState.getProducts) products$: Observable<Product[]>;
  totalItems: number = 0;
  itemsPerPage:number = 5;
  currentPage: number = 1;
  totalPages: number = 0;
  displayedColumns: string[] = ['Logo','Nombre del producto','Descripción','Fecha Liberación','Fecha Restructuración'];
  constructor(private store: Store) {
    super();
  }

  ngOnInit(): void {
    this.store.dispatch((new GetProductsReset()));
    this.products$.pipe(takeUntil(this.destroy$)).subscribe(products => {
      this.totalItems = products.length;
      this.totalPages = Math.ceil(this.totalItems/ this.itemsPerPage);
    })
    this.store.dispatch((new GetProducts()));
  }

  getStartIndex(): number {
    return (this.currentPage - 1) * this.itemsPerPage;
  }

  getEndIndex(): number {
    return this.getStartIndex() + this.itemsPerPage;
  }

  onPageChange(pageNumber: number): void {
    this.currentPage = pageNumber;
  }

  onItemsPerPageChange(itemsPerPage: number): void {
    this.itemsPerPage = itemsPerPage;
    this.currentPage = 1;
    this.totalPages = Math.ceil(this.totalItems / this.itemsPerPage);
  }

}
