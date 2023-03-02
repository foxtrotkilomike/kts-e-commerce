import Wrapper from "@components/Wrapper";
import Pages from "@customTypes/Pages";
import { useLocalStore } from "@hooks/useLocalStore";
import ProductStore from "@store/ProductStore";

import Hero from "./components/Hero";
import ProductsList from "./components/ProductsList";
import Search from "./components/Search";

const Products = (): JSX.Element => {
  const productStore = useLocalStore(() => new ProductStore());

  return (
    <Wrapper main>
      <Hero page={Pages.MAIN} />
      <Search />
      <ProductsList productStore={productStore} />
    </Wrapper>
  );
};

export default Products;
