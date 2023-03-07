import Typography, {
  TypographySize,
  TypographyTagName,
} from "@components/Typography";
import { Currency } from "@config/data";
import classNames from "classnames";

import classes from "./Price.module.scss";

type PriceProps = {
  price: number;
  currency?: Currency;
  large?: boolean;
};

const Price = ({
  price,
  currency = Currency.DOLLAR,
  large,
}: PriceProps): JSX.Element => {
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
