import { useMemo, useState } from "react";

import EmptyContent from "@components/EmptyContent";
import Loader, { LoaderSize } from "@components/Loader";
import Typography, {
  TypographySize,
  TypographyTagName,
} from "@components/Typography";
import Wrapper from "@components/Wrapper";
import {
  DEFAULT_ERROR_STATUS,
  DEFAULT_PRODUCTS_LIMIT,
  DEFAULT_PRODUCTS_OFFSET,
} from "@config/constants";
import { productsListHeading } from "@config/data";
import { Product } from "@config/types";
import useFetchProducts, { FetchFunctionParams } from "@hooks/useFetchProducts";
import Grid from "@layouts/Grid";
import { getProductsRange } from "@services/products";
import renderProductCards from "@utils/renderProductCards";

import classes from "./ProductsList.module.scss";

export const ProductsList = ({
  productsCount,
}: ProductsListProps): JSX.Element => {
  const [offset, setOffset] = useState(DEFAULT_PRODUCTS_OFFSET);
  const [limit, setLimit] = useState(DEFAULT_PRODUCTS_LIMIT);

  const fetchFunctionParams = useMemo(
    () => [offset, limit] as FetchFunctionParams,
    [offset, limit]
  );
  const [products, responseError] = useFetchProducts<Product[]>(
    [],
    () => getProductsRange(offset, limit),
    fetchFunctionParams
  );

  const isEmptyProducts = products.length === 0;
  const isLoadingContent = responseError.code === DEFAULT_ERROR_STATUS;

  const renderProducts = () =>
    !isEmptyProducts ? (
      <Grid>{renderProductCards(products)}</Grid>
    ) : isLoadingContent ? (
      <div className={classes.loader}>
        <Loader size={LoaderSize.l} />
      </div>
    ) : (
      <EmptyContent error={responseError} />
    );

  return (
    <section>
      <Wrapper centered>
        <div className={classes.header__container}>
          <Typography
            className={classes.header__heading}
            size={TypographySize.lg}
            tagName={TypographyTagName.h2}
          >
            {productsListHeading}
          </Typography>
          <div className={classes.header__counter}>
            {productsCount ? productsCount : 0}
          </div>
        </div>
        {renderProducts()}
      </Wrapper>
    </section>
  );
};

type ProductsListProps = {
  productsCount: number;
};
