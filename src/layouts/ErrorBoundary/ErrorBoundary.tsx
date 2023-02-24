import Typography, {
  TypographySize,
  TypographyTagName,
} from "@components/Typography";
import Wrapper from "@components/Wrapper";
import { ResponseStatus, Routes } from "@config/constants";
import { ErrorMessages } from "@config/data";
import { isRouteErrorResponse, Link, useRouteError } from "react-router-dom";

import classes from "./ErrorBoundary.module.scss";

export const ErrorBoundary = (): JSX.Element => {
  const error = useRouteError() as Error;

  const ErrorCaption = () => (
    <Typography
      className={classes.error__caption}
      tagName={TypographyTagName.paragraph}
      size={TypographySize.lg}
    >
      Go to <Link to={Routes.MAIN}>main page</Link>
    </Typography>
  );

  let InnerMessage = (): JSX.Element => (
    <div className={classes.error}>
      <Typography tagName={TypographyTagName.h1} size={TypographySize.xl}>
        {ErrorMessages.PAGE_NOT_EXIST}
      </Typography>
      <ErrorCaption />
    </div>
  );

  if (isRouteErrorResponse(error)) {
    if (error.status === ResponseStatus.NOT_AUTHORIZED) {
      InnerMessage = () => (
        <div className={classes.error}>
          <Typography tagName={TypographyTagName.h1} size={TypographySize.xl}>
            {ErrorMessages.NOT_AUTHORIZED}
          </Typography>
        </div>
      );
    }

    if (error.status === ResponseStatus.UNHANDLED_REJECTION) {
      InnerMessage = () => (
        <div className={classes.error}>
          <Typography tagName={TypographyTagName.h1} size={TypographySize.xl}>
            {ErrorMessages.UNEXPECTED_ERR}
          </Typography>
          {error?.message ? (
            <Typography
              className={classes.error__caption}
              tagName={TypographyTagName.paragraph}
              size={TypographySize.lg}
            >
              {error.message}
            </Typography>
          ) : (
            <ErrorCaption />
          )}
        </div>
      );
    }
  }

  return (
    <Wrapper main centered className={classes.wrapper}>
      <InnerMessage />
    </Wrapper>
  );
};
