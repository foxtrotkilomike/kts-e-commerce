import { useMemo } from "react";

import EmptyContent from "@components/EmptyContent";
import Loader, { LoaderSize } from "@components/Loader";
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

  const renderProducts = () =>
    !isEmptyProducts ? (
      <Grid>{renderProductCards(relatedProducts)}</Grid>
    ) : isLoading ? (
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
