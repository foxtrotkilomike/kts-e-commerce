import React from "react";

import FilterIcon from "@assets/svg/filter.svg";
import MultiDropdown from "@components/MultiDropdown";
import Typography, {
  TypographySize,
  TypographyTagName,
} from "@components/Typography";
import { Option } from "@customTypes/Option";

import classes from "./SearchFilter.module.scss";

type SearchFilterProps = {
  /** Массив возможных вариантов для выбора */
  options: Option[];
  /** Текущие выбранные значения поля, может быть пустым */
  value: Option["key"];
  /** Callback, вызываемый при выборе варианта */
  onChange: (value: Option["key"]) => void;
  /** Заблокирован ли дропдаун */
  disabled?: boolean;
  placeholder?: string;
};

const SearchFilter = ({
  options,
  value,
  onChange,
  disabled,
  placeholder,
}: SearchFilterProps): JSX.Element => {
  const filterPlaceholder = (
    <div className={classes["search-filter__placeholder"]}>
      <FilterIcon className={classes["search-filter__icon"]} />
      <Typography
        size={TypographySize.md}
        tagName={TypographyTagName.paragraph}
      >
        {placeholder}
      </Typography>
    </div>
  );

  return (
    <div className={classes["search-filter"]}>
      <MultiDropdown
        options={options}
        selectedOptionKey={value}
        onChange={onChange}
        placeholder={filterPlaceholder}
        disabled={disabled}
      />
    </div>
  );
};

export default React.memo(SearchFilter);
