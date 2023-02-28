import classNames from "classnames";

import classes from "./BurgerMenu.module.scss";

type BurgerMenuProps = {
  isBurgerActive: boolean;
  setIsBurgerActive: (isBurgerActive: boolean) => void;
};

export const BurgerMenu = ({
  isBurgerActive,
  setIsBurgerActive,
}: BurgerMenuProps): JSX.Element => {
  const burgerClassName = classNames(classes.burger, {
    [classes.burger_active]: isBurgerActive,
  });

  return (
    <button
      className={burgerClassName}
      onClick={() => setIsBurgerActive(!isBurgerActive)}
      aria-label="menu"
    >
      <span className={classes.burger__line}></span>
      <span className={classes.burger__line}></span>
      <span className={classes.burger__line}></span>
    </button>
  );
};

export default BurgerMenu;
