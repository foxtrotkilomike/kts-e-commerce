import { useEffect, useMemo } from "react";

import Typography, {
  TypographySize,
  TypographyTagName,
} from "@components/Typography";
import Wrapper from "@components/Wrapper";
import { DEFAULT_CATEGORY_ID } from "@config/constants";
import { relatedItemsHeading } from "@config/data";
import QueryParams from "@customTypes/QueryParams";
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
    products,
    selectedProduct,
    productsLoadingStatus,
    productsLoadingError,
  } = productStore;
  const productCategoryId = selectedProduct?.category.id || DEFAULT_CATEGORY_ID;

  useEffect(() => {
    if (productCategoryId !== DEFAULT_CATEGORY_ID) {
      productStore.getFilteredProducts({
        [QueryParams.CATEGORY_ID]: productCategoryId,
      });
    }
  }, [productStore, productCategoryId]);

  const isEmptyProducts = products.length === 0;
  const isLoading = checkLoadingStatus(productsLoadingStatus);

  const renderedProducts = useMemo(
    () =>
      !isEmptyProducts ? <Grid>{renderProductCards(products)}</Grid> : null,
    [isEmptyProducts, products]
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
          data={products}
          renderedContent={renderedProducts}
          responseError={productsLoadingError}
        />
      </section>
    </Wrapper>
  );
};

export default observer(RelatedProducts);
