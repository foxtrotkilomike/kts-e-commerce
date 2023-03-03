import Wrapper from "@components/Wrapper";
import Pages from "@customTypes/Pages";
import { observer } from "mobx-react-lite";

import Hero from "./components/Hero";
import ProductsList from "./components/ProductsList";
import Search from "./components/Search";
import ProductStoreContextProvider from "../../../context/ProductStoreContextProvider";

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

export default observer(Products);
