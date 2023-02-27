import { useEffect, useState } from "react";

import { Routes } from "@config/constants";
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
  const [currentLocation, setCurrentLocation] = useState<Routes>(Routes.MAIN);

  useEffect(() => {
    setCurrentLocation(parseLocationPathName(location.pathname));
  }, [location]);

  const navigationClassName = classNames(classes.header__navigation, {
    [classes.header__navigation_active]: isBurgerActive,
  });

  return (
    <div className={navigationClassName}>
      <Menu currentLocation={currentLocation} />
      <Toolbar />
    </div>
  );
};

export default Navigation;
