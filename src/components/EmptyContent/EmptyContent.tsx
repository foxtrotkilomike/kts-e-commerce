import Typography, {
  TypographySize,
  TypographyTagName,
} from "@components/Typography";
import Wrapper from "@components/Wrapper";
import { emptyContentTextContent } from "@config/data";
import { ApiError } from "@config/types";

import classes from "./EmptyContent.module.scss";

type EmptyContentProps = {
  error?: ApiError;
};

const EmptyContent = ({ error }: EmptyContentProps): JSX.Element => {
  return (
    <Wrapper centered main className={classes.wrapper}>
      <Typography tagName={TypographyTagName.h3}>
        {emptyContentTextContent}
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

export default EmptyContent;
