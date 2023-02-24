import Logo from "@components/Logo";
import { Routes } from "@config/constants";
import { Link } from "react-router-dom";

import classes from "./HeaderLogo.module.scss";

export const HeaderLogo = (): JSX.Element => {
  return (
    <div className={classes.logoContainer}>
      <Link to={Routes.MAIN} aria-label="Main page">
        <Logo hasText />
      </Link>
    </div>
  );
};
