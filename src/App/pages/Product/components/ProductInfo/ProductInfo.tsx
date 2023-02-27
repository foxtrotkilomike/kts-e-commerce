import React from "react";

import Button from "@components/Button";
import Price from "@components/Price";
import Typography, {
  TypographySize,
  TypographyTagName,
} from "@components/Typography";
import Wrapper from "@components/Wrapper";
import { ProductPageButtonsText } from "@config/data";
import Product from "@customTypes/Product";

import classes from "./ProductInfo.module.scss";
import ProductSlider from "../ProductSlider";

type ProductInfoProps = {
  product: Product;
};

const ProductInfo = ({
  product: { title, description, price, images },
}: ProductInfoProps): JSX.Element => {
  return (
    <Wrapper centered>
      <div className={classes.container}>
        <ProductSlider image={images} />
        <div className={classes.productContent}>
          <Typography
            className={classes.title}
            size={TypographySize.lg}
            tagName={TypographyTagName.h1}
          >
            {title}
          </Typography>
          <div className={classes.description}>
            <Typography
              size={TypographySize.md}
              tagName={TypographyTagName.paragraph}
              secondary
            >
              {description}
            </Typography>
          </div>
          <div className={classes.price}>
            <Price price={price} large />
          </div>
          <div className={classes.buttons}>
            <Button>{ProductPageButtonsText.BUY}</Button>
            <Button variant="ghost">{ProductPageButtonsText.ADD_CART}</Button>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default React.memo(ProductInfo);
