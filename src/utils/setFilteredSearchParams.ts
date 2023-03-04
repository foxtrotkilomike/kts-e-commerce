import GetFilteredProductsConfig from "@customTypes/GetFilteredProductsConfig";
import rootStore from "@store/RootStore";
import { mergeSearchParams } from "@utils/mergeSearchParams";
import { NavigateOptions, URLSearchParamsInit } from "react-router-dom";

type SetURLSearchParams = (
  nextInit?:
    | URLSearchParamsInit
    | ((prev: URLSearchParams) => URLSearchParamsInit),
  navigateOpts?: NavigateOptions
) => void;

export const setFilteredSearchParams = (
  nextSearchParams: GetFilteredProductsConfig,
  setSearchParams: SetURLSearchParams
): void => {
  const currentSearchParams = rootStore.query.params;
  const mergedSearchParams = mergeSearchParams(
    currentSearchParams,
    nextSearchParams
  );

  setSearchParams(mergedSearchParams);
};
