import React from "react";

import classNames from "classnames";

import classes from "./Wrapper.module.scss";

type WrapperProps = React.PropsWithChildren<{
  growing?: boolean;
  centered?: boolean;
  main?: boolean;
  className?: string;
}>;

const Wrapper = ({
  growing,
  centered,
  main,
  className,
  children,
}: WrapperProps): JSX.Element => {
  const wrapperClassName = classNames(className, {
    [classes.growing]: main || growing,
    [classes.centered]: centered,
  });
  const TagName = main ? "main" : "div";

  return <TagName className={wrapperClassName}>{children}</TagName>;
};

export default Wrapper;
