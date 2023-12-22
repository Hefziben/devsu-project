// product.state.ts

import { State, Action, StateContext, Selector, Store } from '@ngxs/store';
import { tap } from 'rxjs/operators';
import { ProductService } from '../services/product.service';
import {GetProducts, GetProductsFailed, GetProductsReset, GetProductsSuccess, ProductStateModel, ValidateProductId, ValidateProductIdFailed, ValidateProductIdSuccess, AddProductReset, AddProduct, AddProductSuccess, AddProductFailed, GetProductById, UpdateProduct, UpdateProductSuccess, UpdateProductFailed } from './product.actions';
import { Injectable } from '@angular/core';
import { Product } from '../models/product.model';
import { productUpdateHelper } from '../util/product.util';


@State<ProductStateModel>({
  name: 'products',
  defaults: {
    products: [],
    loadingProducts: false,
    loadingProductsError: null,
    validatingProductId: false,
    productIdExist: false,
    addingProduct: false,
    selectedProduct: null,
    updatingProduct: false
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

  @Selector()
  static getSelectedProduct(state: ProductStateModel): Product | null {
    return state.selectedProduct;
  }


  // Actions
  @Action(GetProducts)
  getProducts(
      context: StateContext<ProductStateModel>) {
      return this.productService.getProducts().pipe(tap(response => {
        context.patchState({ loadingProducts: true});

        this.store.dispatch(new GetProductsSuccess(response));
      }, error => {
        this.store.dispatch(new GetProductsFailed(error.error));
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
        this.store.dispatch(new ValidateProductIdFailed(error.error));
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
  addProduct(
      context: StateContext<ProductStateModel>,
      payload: AddProduct) {
      return this.productService.addProduct(payload.product).pipe(tap(response => {
        context.patchState({ addingProduct: true});

        this.store.dispatch(new AddProductSuccess(response));
      }, error => {
        this.store.dispatch(new AddProductFailed(error.error));
    }));
  }

  @Action(AddProductSuccess)
  addProductSuccess(
      context: StateContext<ProductStateModel>,
      payload: AddProductSuccess) {
      const state = { ...context.getState() };
      context.patchState({
        ...state,
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
        selectedProduct: null
      });
  }


  @Action(GetProductById)
  getProductById(
    context: StateContext<ProductStateModel>, payload: GetProductById) {
      const state = { ...context.getState() };
      const selectedProduct = state.products.find(product => product.id === payload.productId);
      context.patchState({
        ...state,
        selectedProduct
      });
  }

  @Action(UpdateProduct)
  updateProduct(
      context: StateContext<ProductStateModel>,
      payload: UpdateProduct) {
      return this.productService.updateProduct(payload.product).pipe(tap(response => {
        context.patchState({ updatingProduct: true});

        this.store.dispatch(new UpdateProductSuccess(response));
      }, error => {
        this.store.dispatch(new UpdateProductFailed(error.error));
    }));
  }

  @Action(UpdateProductSuccess)
  updateProductSuccess(
      context: StateContext<ProductStateModel>,
      payload: AddProductSuccess) {
      const state = { ...context.getState() };
      const updatedList = productUpdateHelper(state.products, payload.product);
      context.patchState({
        ...state,
          products: [...updatedList],
          updatingProduct: false
      });
  }

  @Action(UpdateProductFailed)
  updateProductFailed(
      { patchState }: StateContext<ProductStateModel>) {
      patchState({
        updatingProduct: false
      });
  }
 }
