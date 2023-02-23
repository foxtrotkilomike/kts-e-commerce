import React from "react";

import classNames from "classnames";

import classes from "./Typography.module.scss";

export enum TypographySize {
  sm = "sm",
  md = "md",
  md_p = "md_p",
  lg = "lg",
  xl = "xl",
}

export enum TypographyTagName {
  h1 = "h1",
  h2 = "h2",
  h3 = "h3",
  paragraph = "p",
}

type TypographyProps = React.PropsWithChildren<{
  size: TypographySize;
  tagName: TypographyTagName;
  bold?: boolean;
  secondary?: boolean;
  className?: string;
}>;

export const Typography = ({
  size,
  tagName: TagName,
  bold,
  secondary,
  className,
  children,
}: TypographyProps): JSX.Element => {
  const typographyClassName = classNames(classes.typography, className, {
    [classes.heading_xl]: TagName === TypographyTagName.h1,
    [classes.heading_lg]:
      TagName === TypographyTagName.h2 ||
      (TagName === TypographyTagName.h1 && size === TypographySize.lg),
    [classes.heading_md_p]:
      (TagName === TypographyTagName.h3 && size === TypographySize.md_p) ||
      (TagName === TypographyTagName.h2 && size === TypographySize.md_p),
    [classes.heading_md]: TagName === TypographyTagName.h3,
    [classes.paragraph_lg]:
      TagName === TypographyTagName.paragraph && size === TypographySize.lg,
    [classes.paragraph_md]:
      TagName === TypographyTagName.paragraph && size === TypographySize.md,
    [classes.paragraph_sm]:
      TagName === TypographyTagName.paragraph && size === TypographySize.sm,
    [classes.bold]: bold,
    [classes.secondary]: secondary,
  });

  return <TagName className={typographyClassName}>{children}</TagName>;
};
