import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable, Subject, debounceTime, distinctUntilChanged, switchMap, takeUntil } from 'rxjs';
import { Product } from '../../../models/product.model';
import { Destroyable } from '../../../shared/abstract/destroyable';
import { DeleteProduct, GetProducts, GetProductsReset } from '../../../store/product.actions';
import { ProductState } from '../../../store/product.store';
import { displayedColumnsDefault, filterItems } from '../../../util/product.util';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuDirective } from '../../../shared/directive/dropdown/drop-down-menu.directive';
import { ConfirmationService } from '../../../services/confirmation/confirmation.service';
import { ConfirmationDialog } from '../../../models/confirmation.model';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
  providers: [MenuDirective]
})
export class ProductListComponent extends Destroyable implements OnInit {
  // product selector
  @Select(ProductState.getProducts) products$: Observable<Product[]>;
  totalItems: number = 0;
  itemsPerPage:number = 5;
  currentPage: number = 1;
  totalPages: number = 0;
  displayedColumns: string[] = displayedColumnsDefault;
  searchTerm = '';
  productFilter$ = new Subject<string>();
  products: Product[] = [];
  filteredProducts: Product[] = [];
  isVisible: boolean;
  isMobile = false;
  constructor(
    private store: Store,
    private router: Router,
    private route: ActivatedRoute,
    private confirmationService: ConfirmationService
    ) {
    super();
  }

  ngOnInit(): void {
    this.checkScreenWidth();
    window.addEventListener('resize', this.checkScreenWidth.bind(this));
    this.store.dispatch((new GetProductsReset()));
    this.products$.pipe(takeUntil(this.destroy$)).subscribe(products => {
      this.products = products;
      this.filteredProducts = products;
      this.updateTotalItems()
    })
    this.store.dispatch((new GetProducts()));

    this.productFilter$
      .pipe(
        debounceTime(200),
        distinctUntilChanged(),
        switchMap(term => filterItems(term, this.products))
      )
      .subscribe(filteredProducts => {
        this.filteredProducts = filteredProducts;
        this.updateTotalItems()
      });
  }

  checkScreenWidth() {
    this.isMobile = window.innerWidth <= 600;
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

  onSearch(): void {
    this.productFilter$.next(this.searchTerm);
  }

  updateTotalItems() {
    this.totalItems = this.filteredProducts.length;
    this.totalPages = Math.ceil(this.totalItems / this.itemsPerPage);
  }

  addProduct() {
    this.router.navigate(['agregar'], { relativeTo: this.route });
  }

  onEditClicked(productId: string): void {
    this.router.navigate(['agregar'], { relativeTo: this.route, queryParams: { id: productId } });
  }


  showConfirmation(product: Product) {
    const configuration: ConfirmationDialog = {
      title: 'Confirmación',
      message: `Estas seguro que deseas eliminar el registro:  ${product.name} `,
    }
    this.confirmationService.showConfirmationDialog(configuration)
    .subscribe(result => {
      if (result.isConfirmed) {
        this.store.dispatch(new DeleteProduct(product.id));
      }
    });
  }

   get getSlicedProducts(): Product[] {
    const startIndex = this.getStartIndex();
    const endIndex = this.getEndIndex();
    return this.filteredProducts.slice(startIndex, endIndex);
  }

  trackById(index: number, item: any): string {
    return item.id;
  }

}
