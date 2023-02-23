import React from "react";

import classes from "./Grid.module.scss";

export const Grid = ({ children }: GridProps): JSX.Element => {
  return <div className={classes.grid}>{children}</div>;
};

type GridProps = React.PropsWithChildren;
