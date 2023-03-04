import { DEFAULT_CATEGORY_ID } from "@config/constants";
import QueryParams from "@customTypes/QueryParams";
import rootStore from "@store/RootStore";

const getInitSearchValue = (): number => {
  const option = rootStore.query.getParam(QueryParams.CATEGORY_ID);
  const optionNumber = Number(option);

  return Number.isNaN(optionNumber) || optionNumber === DEFAULT_CATEGORY_ID
    ? DEFAULT_CATEGORY_ID
    : optionNumber;
};

export default getInitSearchValue;
