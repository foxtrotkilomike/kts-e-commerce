import { useMemo, useState } from "react";

import EmptyContent from "@components/EmptyContent";
import Loader, { LoaderSize } from "@components/Loader";
import Typography, {
  TypographySize,
  TypographyTagName,
} from "@components/Typography";
import Wrapper from "@components/Wrapper";
import {
  DEFAULT_CATEGORY_ID,
  DEFAULT_ERROR_STATUS,
  DEFAULT_PRODUCTS_LIMIT,
  DEFAULT_PRODUCTS_OFFSET,
} from "@config/constants";
import { relatedItemsHeading } from "@config/data";
import ApiError from "@customTypes/ApiError";
import Product from "@customTypes/Product";
import useFetchProducts, { FetchFunctionParams } from "@hooks/useFetchProducts";
import Grid from "@layouts/Grid";
import { getProductsByCategory } from "@services/products";
import renderProductCards from "@utils/renderProductCards";

import classes from "./RelatedProducts.module.scss";

type RelatedProductsProps = {
  productCategoryId: number;
};

const RelatedProducts = ({
  productCategoryId,
}: RelatedProductsProps): JSX.Element => {
  const [offset, setOffset] = useState(DEFAULT_PRODUCTS_OFFSET);
  const [limit, setLimit] = useState(DEFAULT_PRODUCTS_LIMIT);

  const fetchFunctionParams = useMemo(
    () => [offset, limit, productCategoryId] as FetchFunctionParams,
    [offset, limit, productCategoryId]
  );
  const [relatedProducts, responseError] = useFetchProducts<Product[]>(
    [],
    () => getProductsByCategory(productCategoryId, offset, limit),
    fetchFunctionParams
  ) as [Product[], ApiError];

  const isEmptyProducts = relatedProducts.length === 0;
  const isLoadingContent =
    responseError.code === DEFAULT_ERROR_STATUS ||
    productCategoryId === DEFAULT_CATEGORY_ID;

  const renderProducts = () =>
    !isEmptyProducts ? (
      <Grid>{renderProductCards(relatedProducts)}</Grid>
    ) : isLoadingContent ? (
      <div className={classes.loader}>
        <Loader size={LoaderSize.l} />
      </div>
    ) : (
      <EmptyContent error={responseError} />
    );

  return (
    <Wrapper centered>
      <section>
        <Typography
          className={classes.heading}
          size={TypographySize.md_p}
          tagName={TypographyTagName.h2}
        >
          {relatedItemsHeading}
        </Typography>
        {renderProducts()}
      </section>
    </Wrapper>
  );
};

export default RelatedProducts;
