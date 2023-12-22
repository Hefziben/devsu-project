// product.state.ts

import { State, Action, StateContext, Selector, Store } from '@ngxs/store';
import { tap } from 'rxjs/operators';
import { ProductService } from '../services/product.service';
import {GetProducts, GetProductsFailed, GetProductsReset, GetProductsSuccess, ProductStateModel, ValidateProductId, ValidateProductIdFailed, ValidateProductIdSuccess, AddProductReset, AddProduct, AddProductSuccess, AddProductFailed } from './product.actions';
import { Injectable } from '@angular/core';
import { Product } from '../models/product.model';


@State<ProductStateModel>({
  name: 'products',
  defaults: {
    products: [],
    loadingProducts: false,
    loadingProductsError: null,
    validatingProductId: false,
    productIdExist: false,
    addingProduct: false
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

  @Selector()
  static isProductIdExisting(state: ProductStateModel): boolean {
    return state.productIdExist;
  }

  @Selector()
  static validatingProductId(state: ProductStateModel): boolean {
    return state.validatingProductId;
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
        products: [],
        validatingProductId: false,
        productIdExist: false
      });
  }

  @Action(ValidateProductId)
  validateProductId(
      context: StateContext<ProductStateModel>,
      payload: ValidateProductId) {
      return this.productService.validateProductId(payload.ProductId).pipe(tap(response => {
        context.patchState({ validatingProductId: true});

        this.store.dispatch(new ValidateProductIdSuccess(response));
      }, error => {
        this.store.dispatch(new ValidateProductIdFailed(error));
    }));
  }

  @Action(ValidateProductIdSuccess)
  validateProductIdSuccess(
      context: StateContext<ProductStateModel>,
      payload: ValidateProductIdSuccess) {
      context.patchState({
          validatingProductId: false,
          productIdExist: payload.productIdExist
      });
  }

  @Action(ValidateProductIdFailed)
  validateProductIdFailed(
      { patchState }: StateContext<ProductStateModel>) {
      patchState({
        validatingProductId: false
      });
  }


  @Action(AddProduct)
  dddProduct(
      context: StateContext<ProductStateModel>,
      payload: AddProduct) {
      return this.productService.addProduct(payload.product).pipe(tap(response => {
        context.patchState({ addingProduct: true});

        this.store.dispatch(new AddProductSuccess(response));
      }, error => {
        this.store.dispatch(new AddProductFailed(error));
    }));
  }

  @Action(AddProductSuccess)
  addProductSuccess(
      context: StateContext<ProductStateModel>,
      payload: AddProductSuccess) {
        const state = { ...context.getState() };
      context.patchState({
          products: [...state.products, payload.product],
          addingProduct: false
      });
  }

  @Action(AddProductFailed)
  addProductFailed(
      { patchState }: StateContext<ProductStateModel>,
      payload: AddProductFailed) {
      patchState({
        addingProduct: false,
        loadingProductsError: payload.message
      });
  }

  @Action(AddProductReset)
  addProductsReset(
      { patchState }: StateContext<ProductStateModel>) {
      patchState({
        validatingProductId: false,
        productIdExist: false,
      });
  }
 }
