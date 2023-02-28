import { useCallback, useMemo } from "react";

import Typography, {
  TypographySize,
  TypographyTagName,
} from "@components/Typography";
import Wrapper from "@components/Wrapper";
import { INITIAL_PRODUCTS } from "@config/api";
import {
  DEFAULT_PRODUCTS_LIMIT,
  DEFAULT_PRODUCTS_OFFSET,
} from "@config/constants";
import { relatedItemsHeading } from "@config/data";
import GetProductsByCategory from "@customTypes/GetProductsByCategory";
import useFetchProducts from "@hooks/useFetchProducts";
import Grid from "@layouts/Grid";
import ProductContent from "@layouts/ProductContent";
import { getProductsRange } from "@services/products";
import renderProductCards from "@utils/renderProductCards";

import classes from "./RelatedProducts.module.scss";

type RelatedProductsProps = {
  productCategoryId: number;
};

const RelatedProducts = ({
  productCategoryId,
}: RelatedProductsProps): JSX.Element => {
  const fetchConfig = useMemo(() => {
    return {
      offset: DEFAULT_PRODUCTS_OFFSET,
      limit: DEFAULT_PRODUCTS_LIMIT,
      categoryId: productCategoryId,
    };
  }, [productCategoryId]);

  const {
    products: relatedProducts,
    isLoading,
    responseError,
  } = useFetchProducts<GetProductsByCategory>(
    INITIAL_PRODUCTS,
    fetchConfig,
    getProductsRange
  );

  const isEmptyProducts = relatedProducts.length === 0;
  const renderProducts = useCallback(
    () => <Grid>{renderProductCards(relatedProducts)}</Grid>,
    [relatedProducts]
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
        <ProductContent
          isLoading={isLoading}
          isEmpty={isEmptyProducts}
          content={relatedProducts}
          renderContent={renderProducts}
          responseError={responseError}
        />
      </section>
    </Wrapper>
  );
};

export default RelatedProducts;
