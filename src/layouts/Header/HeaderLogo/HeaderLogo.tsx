import Logo from "@components/Logo";

import classes from "./HeaderLogo.module.scss";

export const HeaderLogo = (): JSX.Element => {
  return (
    <div className={classes.logoContainer}>
      <a href="/" aria-label="Main page">
        <Logo hasText />
      </a>
    </div>
  );
};
