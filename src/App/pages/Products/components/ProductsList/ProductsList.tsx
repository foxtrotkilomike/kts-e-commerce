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
  TOTAL_PRODUCTS_COUNT,
} from "@config/constants";
import { productsListHeading } from "@config/data";
import { ApiError, Product } from "@config/types";
import useFetchProducts, { FetchFunctionParams } from "@hooks/useFetchProducts";
import gridClasses from "@layouts/Grid/Grid.module.scss";
import EndMessage from "@pages/Products/components/EndMessage";
import { getProductsRange } from "@services/products";
import renderProductCards from "@utils/renderProductCards";
import classNames from "classnames";
import InfiniteScroll from "react-infinite-scroll-component";

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
  const [products, responseError] = useFetchProducts<Product>(
    [],
    () => getProductsRange(offset, limit),
    fetchFunctionParams
  ) as [Product[], ApiError];

  const isEmptyProducts = products.length === 0;
  const isLoadingContent = responseError.code === DEFAULT_ERROR_STATUS;
  const hasMore = products.length < TOTAL_PRODUCTS_COUNT;
  const infiniteScrollClassName = classNames(
    gridClasses.grid,
    classes.infiniteScroll
  );
  const fetchNextProducts = () => setOffset(offset + limit);

  const renderProducts = () =>
    !isEmptyProducts ? (
      <InfiniteScroll
        dataLength={products.length}
        next={fetchNextProducts}
        hasMore={hasMore}
        loader={
          <div className={classes.loader}>
            <Loader size={LoaderSize.l} />
          </div>
        }
        endMessage={<EndMessage />}
        className={infiniteScrollClassName}
      >
        {renderProductCards(products)}
      </InfiniteScroll>
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
