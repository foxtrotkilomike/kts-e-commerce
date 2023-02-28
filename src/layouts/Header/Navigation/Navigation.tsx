import React from "react";

import Menu from "@layouts/Header/Menu";
import Toolbar from "@layouts/Header/Toolbar";
import { parseLocationPathName } from "@utils/parseLocationPathName";
import classNames from "classnames";
import { useLocation } from "react-router-dom";

import classes from "./Navigation.module.scss";

type NavigationProps = {
  isBurgerActive: boolean;
};

const Navigation = ({ isBurgerActive }: NavigationProps): JSX.Element => {
  const location = useLocation();

  const navigationClassName = classNames(classes.header__navigation, {
    [classes.header__navigation_active]: isBurgerActive,
  });

  return (
    <div className={navigationClassName}>
      <Menu currentLocation={parseLocationPathName(location.pathname)} />
      <Toolbar />
    </div>
  );
};

export default React.memo(Navigation);
