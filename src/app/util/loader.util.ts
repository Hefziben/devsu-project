export const getLoaderStatus = (loadingProducts: boolean, addingProduct: boolean, updateProduct: boolean): boolean => {
  if (loadingProducts || addingProduct || updateProduct) {
    return true;
  }
  return false;
}
