import { ReactComponent as LogoIcon } from "@assets/svg/logo.svg";

import classes from "./Logo.module.scss";

type LogoProps = {
  hasText?: boolean;
};

const Logo = ({ hasText }: LogoProps): JSX.Element => {
  return (
    <div className={classes.logo}>
      <LogoIcon className={classes.logo__icon} />
      {hasText && <span className={classes.logo__text}>Lalasia</span>}
    </div>
  );
};

export default Logo;
