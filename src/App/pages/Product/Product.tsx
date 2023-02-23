import Wrapper from "@components/Wrapper";
import { productsMock } from "@config/data";

import ProductInfo from "./components/ProductInfo";
import RelatedProducts from "./components/RelatedProducts";

export const Product = (): JSX.Element => {
  return (
    <Wrapper main>
      <ProductInfo product={productsMock[0]} />
      <RelatedProducts />
    </Wrapper>
  );
};
