import Typography, {
  TypographySize,
  TypographyTagName,
} from "@components/Typography";
import classNames from "classnames";

import classes from "./Price.module.scss";

type PriceProps = {
  price: number;
  currency?: "$" | "€";
  large?: boolean;
};

const Price = ({ price, currency = "$", large }: PriceProps): JSX.Element => {
  const priceClassName = classNames(classes.price, {
    [classes.price_large]: large,
  });

  return (
    <div className={priceClassName}>
      <Typography
        size={TypographySize.lg}
        tagName={TypographyTagName.paragraph}
        bold
      >
        {currency}
        {price}
      </Typography>
    </div>
  );
};

export default Price;
