import { Observable, of } from "rxjs";
import { Product } from "../models/product.model";

export const filterItems = (searchTerm: string, products: Product[]): Observable<Product[]> => {
  if (searchTerm) {
    const filteredProducts = products.filter(product =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    return of(filteredProducts);
  } else {
    return of(products);
  }
}
