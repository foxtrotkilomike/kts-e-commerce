import { useEffect, useState } from "react";

import { API_ERRORS } from "@config/api";
import ApiError from "@customTypes/ApiError";
import GetAllProductsConfig from "@customTypes/GetAllProductsConfig";
import GetProductsByCategory from "@customTypes/GetProductsByCategory";
import GetProductsRangeConfig from "@customTypes/GetProductsRangeConfig";
import Product from "@customTypes/Product";

export type FetchProductsConfig =
  | GetAllProductsConfig
  | GetProductsByCategory
  | GetProductsRangeConfig;

const useFetchProducts = <C extends FetchProductsConfig>(
  initialState: Product[],
  config: C,
  fetchFunction: (config: C) => Promise<Product[] | ApiError>
) => {
  const [products, setProducts] = useState<Product[]>(initialState);
  const [responseError, setResponseError] = useState<ApiError>(
    API_ERRORS.initial
  );
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    let ignoreSubsequentFetch = false;
    const getProductsData = async () => {
      setIsLoading(true);
      setResponseError(API_ERRORS.initial);
      const response = await fetchFunction(config);
      if (!response) {
        setResponseError(API_ERRORS.serverIsNotResponding);
        setIsLoading(false);
        return;
      }

      if ("code" in response) {
        setResponseError(response);
        setProducts(initialState);
        setIsLoading(false);
        return;
      }

      if (!ignoreSubsequentFetch) {
        setProducts((prevState) => [...prevState, ...response]);
        setIsLoading(false);
      }
    };

    getProductsData();

    return () => {
      ignoreSubsequentFetch = true;
    };
  }, [config]);

  return { products, isLoading, responseError };
};

export default useFetchProducts;
