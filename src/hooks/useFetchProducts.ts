import { useEffect, useState } from "react";

import { API_ERRORS, INITIAL_ERROR } from "@config/api";
import ApiError from "@customTypes/ApiError";
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
  initialState: T | Array<T>,
  fetchFunction: FetchFunction,
  dependencies?: FetchFunctionParams
): [T | Array<T>, ApiError] => {
  const [data, setData] = useState<T | Array<T>>(initialState);
  const [responseError, setResponseError] = useState<ApiError>(INITIAL_ERROR);

  useEffect(() => {
    let ignoreSubsequentFetch = false;
    const getProductsData = async () => {
      setResponseError(INITIAL_ERROR);
      const response = await fetchFunction();
      if (!response) {
        setResponseError(API_ERRORS.serverIsNotResponding);
        return;
      }

      if ("code" in response) {
        setResponseError(response);
        setData(initialState);
        return;
      }

      if (!ignoreSubsequentFetch) {
        if (Array.isArray(data)) {
          setData((prevState) => [
            ...(prevState as Array<T>),
            ...(response as Array<T>),
          ]);
        } else {
          setData(response as T);
        }
      }
    };

    getProductsData();

    return () => {
      ignoreSubsequentFetch = true;
    };
  }, [dependencies]);

  return [data, responseError];
};

export default useFetchProducts;
