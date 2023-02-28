import classNames from "classnames";

import classes from "./BurgerBackground.module.scss";

type BurgerBackgroundProps = {
  isBurgerActive: boolean;
  onClick: () => void;
};

export const BurgerBackground = ({
  isBurgerActive,
  onClick,
}: BurgerBackgroundProps): JSX.Element => {
  const headerBackgroundClassName = classNames(classes.burger__background, {
    [classes.burger__background_active]: isBurgerActive,
  });

  return (
    <div aria-hidden className={headerBackgroundClassName} onClick={onClick} />
  );
};

export default BurgerBackground;
