import QueryParams from "@customTypes/QueryParams";

const shouldProductsRefresh = (changedParams: string[]): boolean =>
  !(changedParams.length === 1 && changedParams[0] === QueryParams.OFFSET);

export default shouldProductsRefresh;
