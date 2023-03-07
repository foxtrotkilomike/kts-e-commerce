import { DEFAULT_SEARCH_VALUE } from "@config/constants";
import { QueryParamValue } from "@customTypes/QueryParamValue";

const checkSearchValue = (searchValueInit: QueryParamValue): string => {
  return typeof searchValueInit === "string"
    ? searchValueInit
    : DEFAULT_SEARCH_VALUE;
};

export default checkSearchValue;
