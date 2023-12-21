// product.state.ts

import { State, Action, StateContext, Selector } from '@ngxs/store';
import { tap } from 'rxjs/operators';
import { ProductService } from '../services/product.service';
import {GetProducts, ProductStateModel } from './product.actions';
import { Injectable } from '@angular/core';


@State<ProductStateModel>({
  name: 'products',
  defaults: {
    products: [],
  },
})

@Injectable()
export class ProductState {
  constructor(private productService: ProductService) {}

  // Selectors
  @Selector()
  static getProducts(state: ProductStateModel): any[] {
    return state.products;
  }

  // Actions
  @Action(GetProducts)
  getProducts({ getState, setState }: StateContext<ProductStateModel>) {
    return this.productService.getProducts().pipe(
      tap((response) => {
        const state = getState();
        setState({
          ...state,
          products: response, // Assuming the result is an array of products
        });
      })
    );
  }
 }
