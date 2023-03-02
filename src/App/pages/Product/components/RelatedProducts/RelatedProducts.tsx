import { useEffect, useMemo } from "react";

import Typography, {
  TypographySize,
  TypographyTagName,
} from "@components/Typography";
import Wrapper from "@components/Wrapper";
import {
  DEFAULT_PRODUCTS_LIMIT,
  DEFAULT_PRODUCTS_OFFSET,
} from "@config/constants";
import { relatedItemsHeading } from "@config/data";
import { LoadingStatus } from "@customTypes/LoadingStatus";
import Grid from "@layouts/Grid";
import ProductContent from "@layouts/ProductContent";
import ProductStore from "@store/ProductStore";
import renderProductCards from "@utils/renderProductCards";
import { observer } from "mobx-react-lite";

import classes from "./RelatedProducts.module.scss";

type RelatedProductsProps = {
  productStore: ProductStore;
};

const RelatedProducts = ({
  productStore,
}: RelatedProductsProps): JSX.Element => {
  const { relatedProducts, selectedProduct, loadingStatus, loadingError } =
    productStore;
  const productCategoryId = selectedProduct.category.id;

  useEffect(() => {
    productStore.getRelatedProducts({
      offset: DEFAULT_PRODUCTS_OFFSET,
      limit: DEFAULT_PRODUCTS_LIMIT,
      categoryId: productCategoryId,
    });
  }, [productStore, productCategoryId]);

  const isEmptyProducts = relatedProducts.length === 0;
  const isLoading =
    loadingStatus !== LoadingStatus.INITIAL &&
    loadingStatus !== LoadingStatus.PENDING;

  const renderedProducts = useMemo(
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
          renderedContent={renderedProducts}
          responseError={loadingError}
        />
      </section>
    </Wrapper>
  );
};

export default observer(RelatedProducts);
