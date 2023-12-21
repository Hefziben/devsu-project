import { Product } from "../models/product.model";

export interface ProductStateModel {
  products: Product[];
}

// Actions
export class GetProducts {
  static readonly type = '[Product] Get Products';
}

