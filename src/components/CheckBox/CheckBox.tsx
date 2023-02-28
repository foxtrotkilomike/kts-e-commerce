import React from "react";

import classes from "./CheckBox.module.scss";

export type CheckBoxProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "onChange"
> & {
  /** Вызывается при клике на чекбокс */
  onChange: (value: boolean) => void;
};

const CheckBox = ({
  onChange,
  checked,
  ...nativeProps
}: CheckBoxProps): JSX.Element => {
  return (
    <label className={classes.checkbox}>
      <input
        type="checkbox"
        className={classes.checkbox__input}
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        {...nativeProps}
      />
      <div className={classes.checkbox__checkmark} />
    </label>
  );
};

export default CheckBox;
