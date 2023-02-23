import Typography, {
  TypographySize,
  TypographyTagName,
} from "@components/Typography";
import Wrapper from "@components/Wrapper";

import classes from "./Categories.module.scss";

export const Categories = (): JSX.Element => {
  return (
    <Wrapper centered main className={classes.wrapper}>
      <Typography tagName={TypographyTagName.h1} size={TypographySize.xl}>
        Categories page
      </Typography>
    </Wrapper>
  );
};
