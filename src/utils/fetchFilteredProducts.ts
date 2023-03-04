import GetFilteredProductsConfig from "@customTypes/GetFilteredProductsConfig";
import ProductStore from "@store/ProductStore";
import rootStore from "@store/RootStore";

const fetchFilteredProducts = (
  productStore: ProductStore,
  shouldRefresh: boolean = true
) => {
  const queryParams = rootStore.query.params as GetFilteredProductsConfig;
  productStore.getFilteredProducts(queryParams, shouldRefresh);
};

export default fetchFilteredProducts;
