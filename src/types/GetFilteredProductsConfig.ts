import QueryParams from "@customTypes/QueryParams";

type GetFilteredProductsConfig = Partial<{
  [QueryParams.TITLE]: string | null;
  [QueryParams.PRICE]: number | null;
  [QueryParams.PRICE_MIN]: number | null;
  [QueryParams.PRICE_MAX]: number | null;
  [QueryParams.CATEGORY_ID]: number | string | null;
  [QueryParams.OFFSET]: number | null;
  [QueryParams.LIMIT]: number | null;
}>;

export default GetFilteredProductsConfig;
