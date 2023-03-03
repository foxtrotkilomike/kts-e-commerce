import QueryParams from "@customTypes/QueryParams";
import rootStore from "@store/RootStore";

const getInitSearchValue = (): string => {
  const searchParam = rootStore.query.getParam(QueryParams.TITLE);

  return typeof searchParam === "string" ? searchParam : "";
};

export default getInitSearchValue;
