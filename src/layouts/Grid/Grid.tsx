import React from "react";

import classes from "./Grid.module.scss";

type GridProps = React.PropsWithChildren;

const Grid = ({ children }: GridProps): JSX.Element => {
  return <div className={classes.grid}>{children}</div>;
};

export default Grid;
