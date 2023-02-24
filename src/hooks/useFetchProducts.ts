import { useEffect, useState } from "react";

import { API_ERRORS, INITIAL_ERROR } from "@config/api";
import { ApiError } from "@config/types";
import {
  getAllProducts,
  getProductById,
  getProductsByCategory,
  getProductsRange,
} from "@services/products";

type FetchFunction =
  | (() => ReturnType<typeof getAllProducts>)
  | (() => ReturnType<typeof getProductsRange>)
  | (() => ReturnType<typeof getProductById>)
  | (() => ReturnType<typeof getProductsByCategory>);

export type FetchFunctionParams = Parameters<
  | typeof getAllProducts
  | typeof getProductsRange
  | typeof getProductById
  | typeof getProductsByCategory
>;

const useFetchProducts = <T>(
  initialState: T,
  fetchFunction: FetchFunction,
  params?: FetchFunctionParams
): [T, ApiError] => {
  const [data, setData] = useState<T>(initialState);
  const [responseError, setResponseError] = useState<ApiError>(INITIAL_ERROR);

  useEffect(() => {
    const getProductsData = async () => {
      setResponseError(INITIAL_ERROR);
      const response = await fetchFunction();
      if (response) {
        if ("code" in response) {
          setResponseError(response);
          setData(initialState);
        } else {
          setData(response as T);
        }
      } else {
        setResponseError(API_ERRORS.serverIsNotResponding);
      }
    };

    getProductsData();
  }, [params]);

  return [data, responseError];
};

export default useFetchProducts;
