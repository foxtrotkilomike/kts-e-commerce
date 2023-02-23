import Typography, {
  TypographySize,
  TypographyTagName,
} from "@components/Typography";
import Wrapper from "@components/Wrapper";
import { ResponseStatus } from "@config/constants";
import { Routes } from "@config/routes";
import { isRouteErrorResponse, Link, useRouteError } from "react-router-dom";

import classes from "./ErrorBoundary.module.scss";

export const ErrorBoundary = (): JSX.Element => {
  const error = useRouteError() as Error;

  let InnerMessage = (): JSX.Element => (
    <div className={classes.error}>
      <Typography tagName={TypographyTagName.h1} size={TypographySize.xl}>
        This page doesn't exist
      </Typography>
      <Typography
        className={classes.error__caption}
        tagName={TypographyTagName.paragraph}
        size={TypographySize.lg}
      >
        Go to <Link to={Routes.MAIN}>main page</Link>
      </Typography>
    </div>
  );

  if (isRouteErrorResponse(error)) {
    if (error.status === ResponseStatus.NOT_AUTHORIZED) {
      InnerMessage = () => (
        <div className={classes.error}>
          <Typography tagName={TypographyTagName.h1} size={TypographySize.xl}>
            You are not authorized to view this page
          </Typography>
        </div>
      );
    }

    if (error.status === ResponseStatus.UNHANDLED_REJECTION) {
      InnerMessage = () => (
        <div className={classes.error}>
          <Typography tagName={TypographyTagName.h1} size={TypographySize.xl}>
            Sorry, an unexpected error has occurred
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
            <Typography
              className={classes.error__caption}
              tagName={TypographyTagName.paragraph}
              size={TypographySize.lg}
            >
              Go to <Link to={Routes.MAIN}>main page</Link>
            </Typography>
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
