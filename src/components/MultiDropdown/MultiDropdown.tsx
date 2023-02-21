import React, { useState } from "react";

import classes from "./MultiDropdown.module.scss";

/** Вариант для выбора в фильтре */
export type Option = {
  /** Ключ варианта, используется для отправки на бек/использования в коде */
  key: string;
  /** Значение варианта, отображается пользователю */
  value: string;
};

export type MultiDropdownProps = {
  /** Массив возможных вариантов для выбора */
  options: Option[];
  /** Текущие выбранные значения поля, может быть пустым */
  value: Option[];
  /** Callback, вызываемый при выборе варианта */
  onChange: (value: Option[]) => void;
  /** Заблокирован ли дропдаун */
  disabled?: boolean;
  /** Преобразовать выбранные значения в строку. Отображается в дропдауне в качестве выбранного значения */
  pluralizeOptions: (value: Option[]) => string;
};

export const MultiDropdown = ({
  options,
  value,
  onChange,
  disabled,
  pluralizeOptions,
}: MultiDropdownProps): JSX.Element => {
  const [isOpen, setIsOpen] = useState(false);

  const isSelected = (selectedOption: Option) =>
    !!value.find((option) => option.key === selectedOption.key);

  const updateOptions = (selectedOption: Option) =>
    isSelected(selectedOption)
      ? value.filter((option) => option.key !== selectedOption.key)
      : value.concat(selectedOption);

  const onSelect = (selectedOption: Option) => {
    const updatedOptions = updateOptions(selectedOption);
    onChange(updatedOptions);
  };

  const renderDropdownOptions = (options: Option[]) => {
    return options.map((option) => (
      <li key={option.key}>
        <input
          type="checkbox"
          id={option.key}
          checked={isSelected(option)}
          onChange={() => onSelect(option)}
        />
        <label className={classes.multiDropdown__item} htmlFor={option.key}>
          {option.value}
        </label>
      </li>
    ));
  };

  return (
    <div className={classes.multiDropdown}>
      <button
        className={classes.multiDropdown__button}
        disabled={disabled}
        onClick={() => setIsOpen((isOpen) => !isOpen)}
      >
        {pluralizeOptions(value)}
      </button>
      {isOpen && !disabled && (
        <ul className={classes.multiDropdown__list}>
          {renderDropdownOptions(options)}
        </ul>
      )}
    </div>
  );
};
