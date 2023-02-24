import Typography, {
  TypographySize,
  TypographyTagName,
} from "@components/Typography";
import Wrapper from "@components/Wrapper";
import { ApiError } from "@config/types";

import classes from "./EmptyContent.module.scss";

export const EmptyContent = ({ error }: EmptyContentProps): JSX.Element => {
  return (
    <Wrapper centered main className={classes.wrapper}>
      <Typography tagName={TypographyTagName.h3}>
        Data is not available, please, try again later
      </Typography>
      <Typography
        tagName={TypographyTagName.paragraph}
        size={TypographySize.lg}
      >
        {error ? error.message : ""}
      </Typography>
    </Wrapper>
  );
};

type EmptyContentProps = {
  error?: ApiError;
};
