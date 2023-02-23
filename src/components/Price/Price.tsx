import Typography, {
  TypographySize,
  TypographyTagName,
} from "@components/Typography";

import classes from "./Price.module.scss";

export const Price = ({ price, currency = "$" }: PriceProps): JSX.Element => {
  return (
    <div className={classes.price}>
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

type PriceProps = {
  price: number;
  currency?: "$" | "€";
};
