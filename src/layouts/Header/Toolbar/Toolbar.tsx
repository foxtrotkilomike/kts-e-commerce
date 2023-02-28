import { ReactComponent as CartIcon } from "@assets/svg/cart.svg";
import { ReactComponent as ProfileIcon } from "@assets/svg/user.svg";

import classes from "./Toolbar.module.scss";

const Toolbar = (): JSX.Element => {
  return (
    <div className={classes.toolbar}>
      <ul className={classes.toolbar__list}>
        <li className={classes.toolbar__item}>
          <a href="#">
            <CartIcon className={classes.toolbar__icon} />
          </a>
        </li>
        <li className={classes.toolbar__item}>
          <a href="#">
            <ProfileIcon className={classes.toolbar__icon} />
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Toolbar;
