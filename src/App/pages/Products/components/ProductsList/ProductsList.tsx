import Card from "@components/Card";
import Price from "@components/Price";
import Typography, {
  TypographySize,
  TypographyTagName,
} from "@components/Typography";
import Wrapper from "@components/Wrapper";
import { productsListHeading, productsMock } from "@config/data";
import Grid from "@layouts/Grid";

import classes from "./ProductsList.module.scss";

export const ProductsList = ({
  productsCount,
}: ProductsListProps): JSX.Element => {
  const products = productsMock.map((product) => {
    const {
      id,
      title,
      description,
      images,
      category: { name },
      price,
    } = product;
    return (
      <Card
        image={images[0]}
        title={title}
        subtitle={description}
        category={name}
        content={<Price price={price} />}
        key={id}
      />
    );
  });

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
        <Grid>{products}</Grid>
      </Wrapper>
    </section>
  );
};

type ProductsListProps = {
  productsCount: number;
};
