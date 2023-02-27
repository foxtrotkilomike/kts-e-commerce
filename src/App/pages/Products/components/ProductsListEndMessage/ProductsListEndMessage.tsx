import Typography, {
  TypographySize,
  TypographyTagName,
} from "@components/Typography";
import { productListEndMessage } from "@config/data";

import classes from "./ProductsListEndMessage.module.scss";

const ProductsListEndMessage = (): JSX.Element => {
  return (
    <Typography
      className={classes["end-message"]}
      tagName={TypographyTagName.paragraph}
      size={TypographySize.lg}
    >
      {productListEndMessage}
    </Typography>
  );
};

export default ProductsListEndMessage;
