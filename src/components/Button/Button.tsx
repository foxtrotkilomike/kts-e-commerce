import React from "react";

import Loader, { LoaderSize } from "@components/Loader";
import classNames from "classnames";

import classes from "./Button.module.scss";

export type ButtonProps = React.PropsWithChildren<{
  /**
   * Если true, то внутри кнопки вместе с children отображается компонент Loader
   * Также кнопка должна переходить в состояние disabled
   */
  loading?: boolean;
  variant?: "primary" | "ghost";
}> &
  React.ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = ({
  loading,
  variant = "primary",
  className,
  children,
  disabled,
  ...native
}: ButtonProps): JSX.Element => {
  const buttonClassName = classNames(className, classes.button, {
    [classes.button_disabled]: loading || disabled,
    [classes.button_loading]: loading,
    [classes.button_primary]: variant === "primary",
    [classes.button_ghost]: variant === "ghost",
  });

  return (
    <button
      className={buttonClassName}
      disabled={loading || disabled}
      {...native}
    >
      {loading && <Loader className={classes.loader} size={LoaderSize.s} />}
      {children}
    </button>
  );
};
