import Wrapper from "@components/Wrapper";
import Pages from "@customTypes/Pages";

import Hero from "./components/Hero";
import ProductsList from "./components/ProductsList";
import Search from "./components/Search";

const Products = (): JSX.Element => {
  return (
    <Wrapper main>
      <Hero page={Pages.MAIN} />
      <Search />
      <ProductsList />
    </Wrapper>
  );
};

export default Products;
