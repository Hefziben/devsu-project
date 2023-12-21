// product.state.ts

import { State, Action, StateContext, Selector, Store } from '@ngxs/store';
import { tap } from 'rxjs/operators';
import { ProductService } from '../services/product.service';
import {GetProducts, GetProductsFailed, GetProductsReset, GetProductsSuccess, ProductStateModel } from './product.actions';
import { Injectable } from '@angular/core';
import { Product } from '../models/product.model';


@State<ProductStateModel>({
  name: 'products',
  defaults: {
    products: [],
    loadingProducts: false,
    loadingProductsError: null,
  },
})

@Injectable()
export class ProductState {
  constructor(private productService: ProductService, private store: Store) {}

  // Selectors
  @Selector()
  static getProducts(state: ProductStateModel): Product[] {
    return state.products;
  }

  // Actions
  @Action(GetProducts)
  getProducts(
      context: StateContext<ProductStateModel>) {
      return this.productService.getProducts().pipe(tap(response => {
        context.patchState({ loadingProducts: true});

        this.store.dispatch(new GetProductsSuccess(response));
      }, error => {
        this.store.dispatch(new GetProductsFailed(error));
    }));
  }

  @Action(GetProductsSuccess)
  getProductsSuccess(
      context: StateContext<ProductStateModel>,
      payload: GetProductsSuccess) {
      context.patchState({
          products: [...payload.products],
          loadingProducts: false
      });
  }

  @Action(GetProductsFailed)
  getProductsFailed(
      { patchState }: StateContext<ProductStateModel>,
      payload: GetProductsFailed) {
      patchState({
        loadingProducts: false,
        loadingProductsError: payload.message
      });
  }

  @Action(GetProductsReset)
  getProductsReset(
      { patchState }: StateContext<ProductStateModel>) {
      patchState({
        loadingProducts: false,
        loadingProductsError: null,
        products: []
      });
  }
 }
