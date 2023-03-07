import { ReactComponent as LogoIcon } from "@assets/svg/logo.svg";
import { LOGO_TEXT } from "@config/data";

import classes from "./Logo.module.scss";

type LogoProps = {
  hasText?: boolean;
};

const Logo = ({ hasText }: LogoProps): JSX.Element => {
  return (
    <div className={classes.logo}>
      <LogoIcon className={classes.logo__icon} />
      {hasText && <span className={classes.logo__text}>{LOGO_TEXT}</span>}
    </div>
  );
};

export default Logo;
