import React from "react";

import classNames from "classnames";

import classes from "./Input.module.scss";

export type InputProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "onChange"
> & {
  /** Значение поля */
  value: string;
  /** Callback, вызываемый при вводе данных в поле */
  onChange: (value: string) => void;
};

export const Input = ({
  value,
  onChange,
  className,
  disabled,
  ...nativeProps
}: InputProps): JSX.Element => {
  const inputClassName = classNames(classes.input, className, {
    [classes.input_disabled]: disabled,
  });

  return (
    <input
      type="text"
      className={inputClassName}
      value={value}
      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
        onChange(e.target.value)
      }
      disabled={disabled}
      {...nativeProps}
    />
  );
};
