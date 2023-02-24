import Typography, {
  TypographySize,
  TypographyTagName,
} from "@components/Typography";
import { productListEndMessage } from "@config/data";

import classes from "./ProductsListEndMessage.module.scss";

export const ProductsListEndMessage = (): JSX.Element => {
  return (
    <Typography
      className={classes.endMessage}
      tagName={TypographyTagName.paragraph}
      size={TypographySize.lg}
    >
      {productListEndMessage}
    </Typography>
  );
};
