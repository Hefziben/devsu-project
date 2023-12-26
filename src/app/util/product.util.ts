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

export const productUpdateHelper = (array: Product[], newValue: Product) => {
  const currentIndex = array.findIndex(item => item.id === newValue.id);

  if (currentIndex !== -1) {
    // Use spread operator to create a new array with the updated product
    return [
      ...array.slice(0, currentIndex),  // elements before the updated product
      newValue,                      // the updated product
      ...array.slice(currentIndex + 1)   // elements after the updated product
    ];
  }
  // If task with given id is not found, return the original list
  return array;
}
export const displayedColumnsDefault: string[] = ['Logo','Nombre del producto','Descripción','Fecha Liberación','Fecha Restructuración', ''];
