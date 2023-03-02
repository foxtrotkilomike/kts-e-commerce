import React, { useCallback, useEffect, useMemo } from "react";

import Loader, { LoaderSize } from "@components/Loader";
import Typography, {
  TypographySize,
  TypographyTagName,
} from "@components/Typography";
import Wrapper from "@components/Wrapper";
import { DEFAULT_PRODUCTS_LIMIT } from "@config/constants";
import { productsListHeading } from "@config/data";
import gridClasses from "@layouts/Grid/Grid.module.scss";
import ProductContent from "@layouts/ProductContent";
import ProductsListEndMessage from "@pages/Products/components/ProductsListEndMessage";
import ProductStore from "@store/ProductStore";
import { checkLoadingStatus } from "@utils/checkLoadingStatus";
import renderProductCards from "@utils/renderProductCards";
import classNames from "classnames";
import { observer } from "mobx-react-lite";
import InfiniteScroll from "react-infinite-scroll-component";

import classes from "./ProductsList.module.scss";

type ProductsListProps = {
  productStore: ProductStore;
};

const ProductsList = ({ productStore }: ProductsListProps): JSX.Element => {
  const {
    products,
    offset,
    totalProductsCount,
    productsLoadingStatus,
    productsLoadingError,
  } = productStore;

  const isEmptyProducts = products.length === 0;
  const isLoading = checkLoadingStatus(productsLoadingStatus);
  const productsCount = products.length;
  const hasMoreProducts = productsCount < totalProductsCount;

  useEffect(() => {
    let ignoreSubsequentFetch = false;
    const getProductsInRange = async () => {
      await productStore.getProductsInRange(offset);
      // This check is necessary due to React.StrictMode double fetch
      if (!ignoreSubsequentFetch) {
        productStore.setProductsInRange();
      }
    };

    getProductsInRange();
    return () => {
      ignoreSubsequentFetch = true;
    };
  }, [productStore]);

  const infiniteScrollClassName = useMemo(
    () => classNames(gridClasses.grid, classes["infinite-scroll"]),
    []
  );

  const fetchNextProducts = useCallback(
    (offset: number) => {
      productStore.setOffset(offset + DEFAULT_PRODUCTS_LIMIT);
    },
    [productStore]
  );

  const renderedProducts = useMemo(
    () =>
      !isEmptyProducts ? (
        <InfiniteScroll
          dataLength={products.length}
          next={() => fetchNextProducts(offset)}
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
          isLoading={isLoading}
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
