import { Product } from "../models/product.model";

export interface ProductStateModel {
  products: Product[];
  loadingProducts: boolean;
  loadingProductsError: string | null;
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
