import React, { useState } from "react";

import Wrapper from "@components/Wrapper";
import BurgerBackground from "@layouts/Header/BurgerBackground";
import BurgerMenu from "@layouts/Header/BurgerMenu";
import HeaderLogo from "@layouts/Header/HeaderLogo";
import Navigation from "@layouts/Header/Navigation";

import classes from "./Header.module.scss";

const Header = (): JSX.Element => {
  const [isBurgerActive, setIsBurgerActive] = useState(false);

  return (
    <header className={classes.header}>
      <Wrapper centered>
        <div className={classes.header__inner}>
          <HeaderLogo />
          <Navigation isBurgerActive={isBurgerActive} />
          <div className={classes["header__burger-container"]}>
            <BurgerMenu
              isBurgerActive={isBurgerActive}
              setIsBurgerActive={setIsBurgerActive}
            />
          </div>
          <BurgerBackground
            isBurgerActive={isBurgerActive}
            onClick={() => setIsBurgerActive(false)}
          />
        </div>
      </Wrapper>
    </header>
  );
};

export default React.memo(Header);
