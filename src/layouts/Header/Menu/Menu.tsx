import { headerNavItems } from "@config/data";
import { Pages } from "@config/types";
import classNames from "classnames";

import classes from "./Menu.module.scss";

export const Menu = ({ currentPage }: MenuProps): JSX.Element => {
  const getMenuItemClassName = (page: Pages) => {
    return classNames(classes.menu__item, {
      [classes.menu__item_active]: page === currentPage,
    });
  };

  const menuItems = headerNavItems.map(({ page, link, text }) => (
    <li className={getMenuItemClassName(page)} key={page}>
      <a href={link}>{text}</a>
    </li>
  ));

  return (
    <nav className={classes.menu}>
      <ul className={classes.menu__list}>{menuItems}</ul>
    </nav>
  );
};

type MenuProps = {
  currentPage: Pages;
};
