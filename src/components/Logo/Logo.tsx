import logo from "@assets/svg/logo.svg";

import classes from "./Logo.module.scss";

export const Logo = ({ hasText }: LogoProps): JSX.Element => {
  return (
    <div className={classes.logo}>
      <svg className={classes.logo__icon}>
        <use href={`${logo}#logo`}></use>
      </svg>
      {hasText && <span className={classes.logo__text}>Lalasia</span>}
    </div>
  );
};

type LogoProps = {
  hasText?: boolean;
};
