import React from "react";

import classNames from "classnames";

import classes from "./Wrapper.module.scss";

export const Wrapper = ({
  growing,
  centered,
  main,
  children,
}: WrapperProps): JSX.Element => {
  const wrapperClassName = classNames({
    [classes.growing]: main || growing,
    [classes.centered]: centered,
  });
  const TagName = main ? "main" : "div";

  return <TagName className={wrapperClassName}>{children}</TagName>;
};

type WrapperProps = React.PropsWithChildren<{
  growing?: boolean;
  centered?: boolean;
  main?: boolean;
}>;