import GetFilteredProductsConfig from "@customTypes/GetFilteredProductsConfig";
import { QueryParamsStringified } from "@customTypes/QueryParamsStringified";

export const mergeSearchParams = (
  currentSearchParams: QueryParamsStringified,
  newSearchParams: GetFilteredProductsConfig
): QueryParamsStringified => {
  const result = Object.assign({}, currentSearchParams);
  for (let key of Object.keys(newSearchParams)) {
    if (newSearchParams[key as keyof GetFilteredProductsConfig] !== null) {
      result[key as keyof QueryParamsStringified] = String(
        newSearchParams[key as keyof QueryParamsStringified]
      );
    } else {
      delete result[key as keyof QueryParamsStringified];
    }
  }

  return result;
};
