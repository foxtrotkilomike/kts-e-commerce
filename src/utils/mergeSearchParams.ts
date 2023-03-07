import GetFilteredProductsConfig from "@customTypes/GetFilteredProductsConfig";
import { QueryParamsStringified } from "@customTypes/QueryParamsStringified";

export const mergeSearchParams = (
  currentSearchParams: QueryParamsStringified,
  nextSearchParams: GetFilteredProductsConfig
): QueryParamsStringified => {
  const result = Object.assign({}, currentSearchParams);
  for (let key of Object.keys(nextSearchParams)) {
    if (nextSearchParams[key as keyof GetFilteredProductsConfig] !== null) {
      result[key as keyof QueryParamsStringified] = String(
        nextSearchParams[key as keyof GetFilteredProductsConfig]
      );
    } else {
      delete result[key as keyof QueryParamsStringified];
    }
  }

  return result;
};
