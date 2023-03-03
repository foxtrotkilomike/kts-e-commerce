import QueryParams from "@customTypes/QueryParams";

type GetFilteredProducts = Partial<{
  [QueryParams.TITLE]: string;
  [QueryParams.PRICE]: number;
  [QueryParams.PRICE_MIN]: number;
  [QueryParams.PRICE_MAX]: number;
  [QueryParams.CATEGORY_ID]: number;
  [QueryParams.OFFSET]: number;
  [QueryParams.LIMIT]: number;
}>;

export default GetFilteredProducts;
