import { Product } from "../types/Product";
export type ACTIONTYPE =
  | { type: "load_products"; newProductsArray: Array<Product> }
  | { type: "update_products"; productId: number }
  | { type: "update_quantity"; productId: number; newQuantity: number };
export function reducer(products: Product[], action: ACTIONTYPE) {
  switch (action.type) {
    case "load_products": {
      return action.newProductsArray;
    }
    case "update_products": {
      const updatedProducts = [...products];
      const filmIndex = updatedProducts.findIndex(
        (product) => product.id === action.productId,
      );
      if (updatedProducts[filmIndex].quantity > 0)
        updatedProducts[filmIndex].inCart = true;
      else updatedProducts[filmIndex].inCart = false;
      return updatedProducts;
    }
    case "update_quantity": {
      const updatedProducts = [...products];
      const filmIndex = updatedProducts.findIndex(
        (product) => product.id === action.productId,
      );

      updatedProducts[filmIndex].quantity =
        action.newQuantity < 0 ? 0 : action.newQuantity;
      return updatedProducts;
    }
    default:
      throw new Error();
  }
}
