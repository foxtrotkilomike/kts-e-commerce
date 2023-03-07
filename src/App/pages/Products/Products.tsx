import Wrapper from "@components/Wrapper";
import ProductStoreContextProvider from "@context/ProductStore";
import Pages from "@customTypes/Pages";

import Hero from "./components/Hero";
import ProductsList from "./components/ProductsList";
import Search from "./components/Search";

const Products = (): JSX.Element => {
  return (
    <Wrapper main>
      <Hero page={Pages.MAIN} />
      <ProductStoreContextProvider>
        <Search />
        <ProductsList />
      </ProductStoreContextProvider>
    </Wrapper>
  );
};

export default Products;
