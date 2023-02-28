import { useCallback, useMemo, useState } from "react";

import Loader, { LoaderSize } from "@components/Loader";
import Typography, {
  TypographySize,
  TypographyTagName,
} from "@components/Typography";
import Wrapper from "@components/Wrapper";
import { INITIAL_PRODUCTS } from "@config/api";
import {
  DEFAULT_PRODUCTS_COUNT,
  DEFAULT_PRODUCTS_LIMIT,
  DEFAULT_PRODUCTS_OFFSET,
  TOTAL_PRODUCTS_COUNT,
} from "@config/constants";
import { productsListHeading } from "@config/data";
import GetProductsRangeConfig from "@customTypes/GetProductsRangeConfig";
import useFetchProducts from "@hooks/useFetchProducts";
import gridClasses from "@layouts/Grid/Grid.module.scss";
import ProductContent from "@layouts/ProductContent";
import ProductsListEndMessage from "@pages/Products/components/ProductsListEndMessage";
import { getProductsRange } from "@services/products";
import renderProductCards from "@utils/renderProductCards";
import classNames from "classnames";
import InfiniteScroll from "react-infinite-scroll-component";

import classes from "./ProductsList.module.scss";

const ProductsList = (): JSX.Element => {
  const [offset, setOffset] = useState(DEFAULT_PRODUCTS_OFFSET);

  const fetchConfig = useMemo(() => {
    return { offset, limit: DEFAULT_PRODUCTS_LIMIT };
  }, [offset]);

  const { products, isLoading, responseError } =
    useFetchProducts<GetProductsRangeConfig>(
      INITIAL_PRODUCTS,
      fetchConfig,
      getProductsRange
    );

  const isEmptyProducts = products.length === 0;
  const productsCount = products.length;
  const hasMoreProducts = productsCount < TOTAL_PRODUCTS_COUNT;
  const infiniteScrollClassName = useMemo(
    () => classNames(gridClasses.grid, classes.infiniteScroll),
    []
  );
  const fetchNextProducts = useCallback(() => {
    setOffset((offset) => offset + DEFAULT_PRODUCTS_LIMIT);
  }, []);

  const renderProducts = useCallback(
    () => (
      <InfiniteScroll
        dataLength={products.length}
        next={fetchNextProducts}
        hasMore={hasMoreProducts}
        loader={
          <div className={classes.loader}>
            <Loader size={LoaderSize.l} />
          </div>
        }
        endMessage={<ProductsListEndMessage />}
        className={infiniteScrollClassName}
      >
        {renderProductCards(products)}
      </InfiniteScroll>
    ),
    [products, fetchNextProducts, hasMoreProducts, infiniteScrollClassName]
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
            {productsCount ? productsCount : DEFAULT_PRODUCTS_COUNT}
          </div>
        </div>
        <ProductContent
          isLoading={isLoading}
          isEmpty={isEmptyProducts}
          content={products}
          renderContent={renderProducts}
          responseError={responseError}
        />
      </Wrapper>
    </section>
  );
};

export default ProductsList;
