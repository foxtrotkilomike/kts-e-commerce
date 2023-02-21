import { headerNavItems } from "@config/data";
import { Pages } from "@config/types";
import classNames from "classnames";

import classes from "./Navigation.module.scss";

export const Navigation = ({ currentPage }: HeaderNavProps): JSX.Element => {
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

type HeaderNavProps = {
  currentPage: Pages;
};
