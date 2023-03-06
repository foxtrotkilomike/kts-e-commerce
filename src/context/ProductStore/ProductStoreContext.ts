import { createContext, useContext } from "react";

import ProductStore from "@store/ProductStore";

export const ProductStoreContext = createContext<ProductStore>(
  new ProductStore()
);

export const useProductStoreContext = () => useContext(ProductStoreContext);
