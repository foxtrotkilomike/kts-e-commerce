import { DEFAULT_SEARCH_VALUE } from "@config/constants";
import QueryParams from "@customTypes/QueryParams";
import rootStore from "@store/RootStore";

const getInitSearchValue = (): string => {
  const searchParam = rootStore.query.getParam(QueryParams.TITLE);

  return typeof searchParam === "string" ? searchParam : DEFAULT_SEARCH_VALUE;
};

export default getInitSearchValue;
