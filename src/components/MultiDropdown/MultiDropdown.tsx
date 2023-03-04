import React, { useState } from "react";

import { DEFAULT_FILTER_VALUE } from "@config/constants";
import { Option } from "@customTypes/Option";
import classNames from "classnames";

import classes from "./MultiDropdown.module.scss";

export type MultiDropdownProps = {
  /** Массив возможных вариантов для выбора */
  options: Option[];
  /** Текущее выбранное поле (ключ), может быть пустым */
  selectedOptionKey: Option["key"];
  /** Callback, вызываемый при выборе варианта */
  onChange: (value: Option["key"]) => void;
  /** Заблокирован ли дропдаун */
  disabled?: boolean;
  placeholder?: React.ReactNode;
  className?: string;
};

const MultiDropdown = ({
  options,
  selectedOptionKey,
  onChange,
  disabled,
  placeholder = "",
  className,
}: MultiDropdownProps): JSX.Element => {
  const [isOpen, setIsOpen] = useState(false);
  const selectedOptionValue =
    options.find((option) => option.key === selectedOptionKey)?.value ||
    DEFAULT_FILTER_VALUE;
  const hasSelectedOptions = selectedOptionValue !== DEFAULT_FILTER_VALUE;

  const multiDropDownClassName = classNames(
    classes["multi-dropdown"],
    className
  );

  const onSelect = (selectedOptionKey: Option["key"]) => {
    onChange(selectedOptionKey);
    setIsOpen((isOpen) => !isOpen);
  };

  const renderDropdownOptions = (options: Option[]) => {
    return options.map((option) => (
      <li key={option.key}>
        <input
          type="radio"
          id={option.value}
          checked={selectedOptionKey === option.key}
          onChange={() => onSelect(option.key)}
        />
        <label
          className={classes["multi-dropdown__item"]}
          htmlFor={option.value}
        >
          {option.value}
        </label>
      </li>
    ));
  };

  const renderButtonContent = () => {
    return hasSelectedOptions ? (
      <div className={classes["multi-dropdown__summary"]}>
        {selectedOptionValue}
      </div>
    ) : (
      placeholder
    );
  };

  return (
    <div className={multiDropDownClassName}>
      <button
        className={classes["multi-dropdown__button"]}
        disabled={disabled}
        onClick={() => setIsOpen((isOpen) => !isOpen)}
      >
        {renderButtonContent()}
      </button>
      {isOpen && !disabled && (
        <ul className={classes["multi-dropdown__list"]}>
          {renderDropdownOptions(options)}
        </ul>
      )}
    </div>
  );
};

export default React.memo(MultiDropdown);
