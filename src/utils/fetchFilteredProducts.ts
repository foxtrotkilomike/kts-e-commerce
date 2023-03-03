import ProductStore from "@store/ProductStore";
import rootStore from "@store/RootStore";

const fetchFilteredProducts = (
  productStore: ProductStore,
  refresh: boolean = true
) => {
  const queryParams = rootStore.query.params;
  productStore.getFilteredProducts(queryParams, refresh);
};

export default fetchFilteredProducts;
