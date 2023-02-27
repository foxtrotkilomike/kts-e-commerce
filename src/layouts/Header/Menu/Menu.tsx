import { Routes } from "@config/constants";
import { headerNavItems } from "@config/data";
import classNames from "classnames";
import { Link } from "react-router-dom";

import classes from "./Menu.module.scss";

type MenuProps = {
  currentLocation: Routes;
};

const Menu = ({ currentLocation }: MenuProps): JSX.Element => {
  const getMenuItemClassName = (page: Routes) => {
    return classNames(classes.menu__item, {
      [classes.menu__item_active]: page === currentLocation,
    });
  };

  const menuItems = headerNavItems.map(({ link, text }) => (
    <li className={getMenuItemClassName(link)} key={link}>
      <Link to={link}>{text}</Link>
    </li>
  ));

  return (
    <nav className={classes.menu}>
      <ul className={classes.menu__list}>{menuItems}</ul>
    </nav>
  );
};

export default Menu;
