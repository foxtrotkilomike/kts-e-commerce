import QueryParams from "@customTypes/QueryParams";
import ProductStore from "@store/ProductStore";
import rootStore from "@store/RootStore";

const fetchFilteredProducts = (productStore: ProductStore) => {
  const title = rootStore.query.getParam(QueryParams.TITLE);

  if (typeof title === "string") {
    productStore.getFilteredProducts({ [QueryParams.TITLE]: title });
  }
};

export default fetchFilteredProducts;
