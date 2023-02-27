import Logo from "@components/Logo";
import { Routes } from "@config/constants";
import { Link } from "react-router-dom";

import classes from "./HeaderLogo.module.scss";

const HeaderLogo = (): JSX.Element => {
  return (
    <div className={classes.logo__container}>
      <Link to={Routes.MAIN} aria-label="Main page">
        <Logo hasText />
      </Link>
    </div>
  );
};

export default HeaderLogo;
