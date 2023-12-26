// product.state.ts

import { State, Action, StateContext, Selector, Store } from '@ngxs/store';
import { tap } from 'rxjs/operators';
import { ProductService } from '../services/product/product.service';
import {GetProducts, GetProductsFailed, GetProductsReset, GetProductsSuccess, ProductStateModel, ValidateProductId, ValidateProductIdFailed, ValidateProductIdSuccess, AddProductReset, AddProduct, AddProductSuccess, AddProductFailed, GetProductById, UpdateProduct, UpdateProductSuccess, UpdateProductFailed, DeleteProductFailed, DeleteProductSuccess, DeleteProduct } from './product.actions';
import { Injectable } from '@angular/core';
import { Product } from '../models/product.model';
import { productUpdateHelper } from '../util/product.util';
import { getLoaderStatus } from '../util/loader.util';


@State<ProductStateModel>({
  name: 'products',
  defaults: {
    products: [],
    loadingProducts: false,
    validatingProductId: false,
    productIdExist: false,
    addingProduct: false,
    selectedProduct: null,
    updatingProduct: false,
    errorMessage: null
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

  @Selector()
  static showLoader(state: ProductStateModel): boolean {
    return getLoaderStatus(state.loadingProducts, state.addingProduct, state.updatingProduct);
  }

  @Selector()
  static getErrorMessage(state: ProductStateModel): string | null {
    return state.errorMessage;
  }



  // Actions
  @Action(GetProducts)
  getProducts(
    context: StateContext<ProductStateModel>) {
    context.patchState({ loadingProducts: true });
    return this.productService.getProducts().pipe(tap({
      next: response => {
        this.store.dispatch(new GetProductsSuccess(response));
      },
      error: error => {
        this.store.dispatch(new GetProductsFailed());
      }
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
      });
  }

  @Action(GetProductsReset)
  getProductsReset(
      { patchState }: StateContext<ProductStateModel>) {
      patchState({
        loadingProducts: false,
        errorMessage: null,
        products: [],
        validatingProductId: false,
        productIdExist: false
      });
  }

  @Action(ValidateProductId)
  validateProductId(
      context: StateContext<ProductStateModel>,
      payload: ValidateProductId) {
      context.patchState({ validatingProductId: true});
    return this.productService.validateProductId(payload.ProductId).pipe(tap({
      next: response => {
        this.store.dispatch(new ValidateProductIdSuccess(response));
      },
      error: error => {
        this.store.dispatch(new ValidateProductIdFailed());
      }
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
    context.patchState({ addingProduct: true });
    return this.productService.addProduct(payload.product).pipe(tap({
      next: response => {
        this.store.dispatch(new AddProductSuccess(response));
      },
      error: error => {
        this.store.dispatch(new AddProductFailed());
      }
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
    context.patchState({ updatingProduct: true });
    return this.productService.updateProduct(payload.product).pipe(tap({
      next: response => {
        this.store.dispatch(new UpdateProductSuccess(response));
      },
      error: error => {
        this.store.dispatch(new UpdateProductFailed());
      }
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

  @Action(DeleteProduct)
  deleteProduct(
    context: StateContext<ProductStateModel>,
    payload: DeleteProduct) {
    context.patchState({ updatingProduct: true });
    return this.productService.deleteProduct(payload.productId).pipe(tap({
      next: () => {
        this.store.dispatch(new DeleteProductSuccess(payload.productId));
      },
      error: (response) => {
        if (response.text) {
          this.store.dispatch(new DeleteProductSuccess(payload.productId));
        } else {
          this.store.dispatch(new DeleteProductFailed());
        }
      }
    }));

  }

  @Action(DeleteProductSuccess)
  deleteProductSuccess(
      context: StateContext<ProductStateModel>,
      payload: DeleteProductSuccess) {
      const state = { ...context.getState() };
      const updatedList = state.products.filter(product => product.id !== payload.productId);
      context.patchState({
        ...state,
          products: [...updatedList],
          updatingProduct: false
      });

  }

  @Action(DeleteProductFailed)
  deleteProductFailed(
      { patchState }: StateContext<ProductStateModel>) {
      patchState({
        updatingProduct: false
      });
  }
 }
