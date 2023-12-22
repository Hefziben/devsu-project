import { Product } from "../models/product.model";

export interface ProductStateModel {
  products: Product[];
  loadingProducts: boolean;
  validatingProductId: boolean;
  productIdExist: boolean;
  loadingProductsError: string | null;
  addingProduct: boolean;
}

// Actions
export class GetProducts {
  static readonly type = '[Product] Get Products';
}

export class GetProductsSuccess {
  static readonly type = '[Product] Get Products Success';
  constructor(public products: Product[]) {}
}

export class GetProductsFailed {
  static readonly type = '[Product] Get Products Failed';
  constructor(public message: string) {}
}

export class GetProductsReset {
  static readonly type = '[Product] Get Products Reset';
}

export class ValidateProductId {
  static readonly type = '[Product] Validate Products ID';
  constructor(public ProductId: string) {}
}

export class ValidateProductIdSuccess {
  static readonly type = '[Product] Validate Products ID Success';
  constructor(public productIdExist: boolean) {}
}

export class ValidateProductIdFailed {
  static readonly type = '[Product] Validate Products ID Failed';
  constructor(public message: string) {}
}

export class AddProduct {
  static readonly type = '[Product] Add Product';
  constructor(public product: Product) {}
}

export class AddProductSuccess {
  static readonly type = '[Product] Add Product Success';
  constructor(public product: Product) {}
}

export class AddProductFailed {
  static readonly type = '[Product] Add Product Failed';
  constructor(public message: string) {}
}

export class AddProductReset {
  static readonly type = '[Product] Add Product Reset';
}

