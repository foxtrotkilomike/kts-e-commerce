import classNames from "classnames";

import classes from "./BurgerBackground.module.scss";

export const BurgerBackground = ({
  isBurgerActive,
  setIsBurgerActive,
}: BurgerBackgroundProps): JSX.Element => {
  const headerBackgroundClassName = classNames(classes.burger__background, {
    [classes.burger__background_active]: isBurgerActive,
  });

  return (
    <div
      aria-hidden
      className={headerBackgroundClassName}
      onClick={() => setIsBurgerActive(false)}
    />
  );
};

type BurgerBackgroundProps = {
  isBurgerActive: boolean;
  setIsBurgerActive: (isBurgerActive: boolean) => void;
};
