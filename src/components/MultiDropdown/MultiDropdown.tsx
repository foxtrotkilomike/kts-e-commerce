import React, { useEffect, useState } from "react";

import { DEFAULT_FILTER_VALUE } from "@config/constants";
import { Option } from "@customTypes/Option";
import classNames from "classnames";
import { runInAction } from "mobx";

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

  useEffect(() => {
    const closeSearchFilter = () => {
      setIsOpen(false);
    };
    window.addEventListener("click", closeSearchFilter);

    return () => window.removeEventListener("click", closeSearchFilter);
  }, []);

  const multiDropDownClassName = classNames(
    classes["multi-dropdown"],
    className
  );

  const onSelect = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.MouseEvent<HTMLLabelElement, MouseEvent>,
    selectedOptionKey: Option["key"]
  ) => {
    e.stopPropagation();
    runInAction(() => {
      onChange(selectedOptionKey);
    });
  };

  const renderDropdownOptions = (options: Option[]) => {
    return options.map((option) => (
      <li key={option.key}>
        <input
          type="radio"
          id={option.value}
          name="multi-dropdown"
          checked={selectedOptionKey === option.key}
          onChange={(e) => onSelect(e, option.key)}
        />
        <label
          className={classes["multi-dropdown__item"]}
          htmlFor={option.value}
          onClick={(e) => {
            onSelect(e, option.key);
            setIsOpen((isOpen) => !isOpen);
          }}
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
        onClick={(e) => {
          e.stopPropagation();
          setIsOpen((isOpen) => !isOpen);
        }}
        onKeyDown={(e: React.KeyboardEvent) => e.stopPropagation()}
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
