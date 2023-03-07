import React from "react";

import { useLocalStore } from "@hooks/useLocalStore";
import ProductStore from "@store/ProductStore";

import { ProductStoreContext } from "./ProductStoreContext";

const ProductStoreContextProvider = ({
  children,
}: React.PropsWithChildren): JSX.Element => {
  const productStore = useLocalStore(() => new ProductStore());

  return (
    <ProductStoreContext.Provider value={productStore}>
      {children}
    </ProductStoreContext.Provider>
  );
};

export default ProductStoreContextProvider;
