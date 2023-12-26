import { Product } from "../models/product.model";

export interface ProductStateModel {
  products: Product[];
  loadingProducts: boolean;
  validatingProductId: boolean;
  productIdExist: boolean;
  addingProduct: boolean;
  updatingProduct: boolean;
  selectedProduct: Product | null;
  errorMessage: string | null;
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
}

export class AddProductReset {
  static readonly type = '[Product] Add Product Reset';
}

export class GetProductById {
  static readonly type = '[Product] Get Products By ID';
  constructor(public productId: string) {}
}

export class UpdateProduct {
  static readonly type = '[Product] Update Product';
  constructor(public product: Product) {}
}

export class UpdateProductSuccess {
  static readonly type = '[Product] Update Product Success';
  constructor(public product: Product) {}
}

export class UpdateProductFailed {
  static readonly type = '[Product] Update Product Failed';
}

export class DeleteProduct {
  static readonly type = '[Product] Delete Product';
  constructor(public productId: string) {}
}

export class DeleteProductSuccess {
  static readonly type = '[Product] Delete Product Success';
  constructor(public productId: string) {}
}

export class DeleteProductFailed {
  static readonly type = '[Product] Delete Product Failed';
}


