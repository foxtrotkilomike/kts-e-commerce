import Typography, {
  TypographySize,
  TypographyTagName,
} from "@components/Typography";
import Wrapper from "@components/Wrapper";
import { productsMock, relatedItemsHeading } from "@config/data";
import Grid from "@layouts/Grid";
import renderProductCards from "@utils/renderProductCards";

import classes from "./RelatedProducts.module.scss";

export const RelatedProducts = (): JSX.Element => {
  const products = renderProductCards(productsMock);

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
        <Grid>{products}</Grid>
      </section>
    </Wrapper>
  );
};
