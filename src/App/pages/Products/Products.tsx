import Wrapper from "@components/Wrapper";
import { Pages } from "@config/types";

import Hero from "./components/Hero";
import ProductsList from "./components/ProductsList";
import Search from "./components/Search";

export const Products = (props: ProductsProps): JSX.Element => {
  return (
    <Wrapper main>
      <Hero page={Pages.MAIN} />
      <Search />
      <ProductsList productsCount={184} />
    </Wrapper>
  );
};

type ProductsProps = Record<string, string>;
