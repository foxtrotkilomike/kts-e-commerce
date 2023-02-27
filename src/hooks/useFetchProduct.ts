import { useEffect, useState } from "react";

import { API_ERRORS, INITIAL_ERROR } from "@config/api";
import ApiError from "@customTypes/ApiError";
import GetProductByIdConfig from "@customTypes/GetProductByIdConfig";
import Product from "@customTypes/Product";

export type FetchProductsConfig = GetProductByIdConfig;

const useFetchProduct = <C extends FetchProductsConfig>(
  initialState: Product,
  config: C,
  fetchFunction: (config: C) => Promise<Product | ApiError>
) => {
  const [product, setProduct] = useState<Product>(initialState);
  const [responseError, setResponseError] = useState<ApiError>(INITIAL_ERROR);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getProductsData = async () => {
      setIsLoading(true);
      setResponseError(INITIAL_ERROR);
      const response = await fetchFunction(config);
      if (!response) {
        setResponseError(API_ERRORS.serverIsNotResponding);
        setIsLoading(false);
        return;
      }

      if ("code" in response) {
        setResponseError(response);
        setProduct(initialState);
        setIsLoading(false);
        return;
      }

      setProduct(response);
      setIsLoading(false);
    };

    getProductsData();
  }, [config]);

  return { product, isLoading, responseError };
};

export default useFetchProduct;
