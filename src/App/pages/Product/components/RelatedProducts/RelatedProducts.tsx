import { useEffect, useMemo } from "react";

import Typography, {
  TypographySize,
  TypographyTagName,
} from "@components/Typography";
import Wrapper from "@components/Wrapper";
import {
  DEFAULT_CATEGORY_ID,
  DEFAULT_PRODUCTS_LIMIT,
  DEFAULT_PRODUCTS_OFFSET,
} from "@config/constants";
import { relatedItemsHeading } from "@config/data";
import Grid from "@layouts/Grid";
import ProductContent from "@layouts/ProductContent";
import ProductStore from "@store/ProductStore";
import { checkLoadingStatus } from "@utils/checkLoadingStatus";
import renderProductCards from "@utils/renderProductCards";
import { observer } from "mobx-react-lite";

import classes from "./RelatedProducts.module.scss";

type RelatedProductsProps = {
  productStore: ProductStore;
};

const RelatedProducts = ({
  productStore,
}: RelatedProductsProps): JSX.Element => {
  const {
    relatedProducts,
    selectedProduct,
    relatedProductsLoadingStatus,
    relatedProductsLoadingError,
  } = productStore;
  const productCategoryId = selectedProduct?.category.id || DEFAULT_CATEGORY_ID;

  useEffect(() => {
    if (productCategoryId !== DEFAULT_CATEGORY_ID) {
      productStore.getRelatedProducts({
        offset: DEFAULT_PRODUCTS_OFFSET,
        limit: DEFAULT_PRODUCTS_LIMIT,
        categoryId: productCategoryId,
      });
    }
  }, [productStore, productCategoryId]);

  const isEmptyProducts = relatedProducts.length === 0;
  const isLoading = checkLoadingStatus(relatedProductsLoadingStatus);

  const renderedProducts = useMemo(
    () =>
      !isEmptyProducts ? (
        <Grid>{renderProductCards(relatedProducts)}</Grid>
      ) : null,
    [isEmptyProducts, relatedProducts]
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
          data={relatedProducts}
          renderedContent={renderedProducts}
          responseError={relatedProductsLoadingError}
        />
      </section>
    </Wrapper>
  );
};

export default observer(RelatedProducts);
