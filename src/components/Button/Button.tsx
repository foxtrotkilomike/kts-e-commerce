import React from "react";

import Loader, { LoaderSize } from "@components/Loader";
import classNames from "classnames";

import "./Button.scss";

/** Пропсы, который принимает компонент Button */
export type ButtonProps = React.PropsWithChildren<{
  /**
   * Если true, то внутри кнопки вместе с children отображается компонент Loader
   * Также кнопка должна переходить в состояние disabled
   */
  loading?: boolean;
}> &
  React.ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = ({
  loading,
  className,
  children,
  disabled,
  ...native
}: ButtonProps): JSX.Element => {
  const buttonClassName = classNames(className, "button", {
    button_disabled: loading || disabled,
    button_loading: loading,
  });

  return (
    <button
      className={buttonClassName}
      disabled={loading || disabled}
      {...native}
    >
      {loading && <Loader className={"loader"} size={LoaderSize.s} />}
      {children}
    </button>
  );
};
