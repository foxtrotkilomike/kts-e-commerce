import React, { useCallback, useEffect, useMemo } from "react";

import Loader, { LoaderSize } from "@components/Loader";
import Typography, {
  TypographySize,
  TypographyTagName,
} from "@components/Typography";
import Wrapper from "@components/Wrapper";
import { DEFAULT_PRODUCTS_LIMIT } from "@config/constants";
import { productsListHeading } from "@config/data";
import { useProductStoreContext } from "@context/ProductStore";
import { useRootStore } from "@context/RootStore";
import QueryParams from "@customTypes/QueryParams";
import gridClasses from "@layouts/Grid/Grid.module.scss";
import ProductContent from "@layouts/ProductContent";
import ProductsListEndMessage from "@pages/Products/components/ProductsListEndMessage";
import fetchFilteredProducts from "@utils/fetchFilteredProducts";
import renderProductCards from "@utils/renderProductCards";
import { setFilteredSearchParams } from "@utils/setFilteredSearchParams";
import classNames from "classnames";
import { observer } from "mobx-react-lite";
import InfiniteScroll from "react-infinite-scroll-component";
import { useSearchParams } from "react-router-dom";

import classes from "./ProductsList.module.scss";

const ProductsList = (): JSX.Element => {
  const rootStore = useRootStore();
  const productStore = useProductStoreContext();
  const [, setSearchParams] = useSearchParams();
  const offset = rootStore.query.getParam(QueryParams.OFFSET);
  const {
    products,
    totalProductsCount,
    productsLoadingError,
    isEmptyProducts,
    isLoadingProducts,
    hasMoreProducts,
  } = productStore;

  useEffect(() => {
    fetchFilteredProducts(productStore);
  }, [productStore]);

  const infiniteScrollClassName = useMemo(
    () => classNames(gridClasses.grid, classes["infinite-scroll"]),
    []
  );

  const fetchNextProducts = useCallback(() => {
    const offsetNumber = Number(offset) || 0;
    const nextOffset = offsetNumber + DEFAULT_PRODUCTS_LIMIT;
    setFilteredSearchParams(
      {
        [QueryParams.OFFSET]: nextOffset,
      },
      setSearchParams
    );
  }, [offset, setSearchParams]);

  const renderedProducts = useMemo(
    () =>
      !isEmptyProducts ? (
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
      ) : null,
    [
      isEmptyProducts,
      products,
      fetchNextProducts,
      hasMoreProducts,
      infiniteScrollClassName,
    ]
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
          <div className={classes.header__counter}>{totalProductsCount}</div>
        </div>
        <ProductContent
          isLoading={isLoadingProducts}
          isEmpty={isEmptyProducts}
          data={products}
          renderedContent={renderedProducts}
          responseError={productsLoadingError}
        />
      </Wrapper>
    </section>
  );
};

export default observer(ProductsList);
