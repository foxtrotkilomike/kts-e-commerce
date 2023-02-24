import Typography, {
  TypographySize,
  TypographyTagName,
} from "@components/Typography";
import { productListEndMessage } from "@config/data";

import classes from "./EndMessage.module.scss";

export const EndMessage = (): JSX.Element => {
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
