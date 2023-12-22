import { Observable, of } from "rxjs";
import { Product } from "../models/product.model";
import { addYearsToDate, getCurrentDate } from "./date.util";

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

export const getDefaultProduct = (): Product => {
  const currentDate = getCurrentDate();
  return {
    id: '',
    name: '',
    description: '',
    logo: '',
    date_release: currentDate,
    date_revision: addYearsToDate(currentDate)
  };
};
