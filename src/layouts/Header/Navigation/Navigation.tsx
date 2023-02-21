import { Pages } from "@config/types";
import Menu from "@layouts/Header/Menu";
import Toolbar from "@layouts/Header/Toolbar";
import classNames from "classnames";

import classes from "./Navigation.module.scss";

export const Navigation = ({
  isBurgerActive,
}: NavigationProps): JSX.Element => {
  const navigationClassName = classNames(classes.header__navigation, {
    [classes.header__navigation_active]: isBurgerActive,
  });

  return (
    <div className={navigationClassName}>
      <Menu currentPage={Pages.MAIN} />
      <Toolbar />
    </div>
  );
};

type NavigationProps = {
  isBurgerActive: boolean;
};
