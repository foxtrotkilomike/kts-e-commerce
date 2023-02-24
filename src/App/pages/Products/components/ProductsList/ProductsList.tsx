import { useState, useEffect } from "react";

import EmptyContent from "@components/EmptyContent";
import Loader, { LoaderSize } from "@components/Loader";
import Typography, {
  TypographySize,
  TypographyTagName,
} from "@components/Typography";
import Wrapper from "@components/Wrapper";
import { API_ERRORS, initialError } from "@config/api";
import { productsListHeading } from "@config/data";
import { ApiError, Product } from "@config/types";
import Grid from "@layouts/Grid";
import { getProductsRange } from "@services/products";
import renderProductCards from "@utils/renderProductCards";

import classes from "./ProductsList.module.scss";

export const ProductsList = ({
  productsCount,
}: ProductsListProps): JSX.Element => {
  const [products, setProducts] = useState<Product[]>([]);
  const [responseError, setResponseError] = useState<ApiError>(initialError);

  useEffect(() => {
    const getProductsData = async () => {
      setResponseError(initialError);
      const response = await getProductsRange();
      if (response) {
        if ("code" in response) {
          setResponseError(response);
          setProducts([]);
        } else {
          setProducts(response);
        }
      } else {
        setResponseError(API_ERRORS.serverIsNotResponding);
      }
    };

    getProductsData();
  }, []);

  const renderProducts = () =>
    products.length > 0 ? (
      <Grid>{renderProductCards(products)}</Grid>
    ) : responseError.code === 0 ? (
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
