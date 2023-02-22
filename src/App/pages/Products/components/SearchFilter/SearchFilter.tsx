import { ReactComponent as FilterIcon } from "@assets/svg/filter.svg";
import MultiDropdown from "@components/MultiDropdown";
import { Option } from "@components/MultiDropdown/MultiDropdown";
import Typography, {
  TypographySize,
  TypographyTagName,
} from "@components/Typography";

import classes from "./SearchFilter.module.scss";

export const SearchFilter = ({
  options,
  value,
  onChange,
  pluralizeOptions,
  disabled,
  textContent,
}: SearchFilterProps): JSX.Element => {
  const filterPlaceholder = (
    <div className={classes.searchFilter__placeholder}>
      <FilterIcon className={classes.searchFilter__icon} />
      <Typography
        size={TypographySize.md}
        tagName={TypographyTagName.paragraph}
      >
        {textContent}
      </Typography>
    </div>
  );

  return (
    <div className={classes.searchFilter}>
      <MultiDropdown
        className={classes.searchFilter__dropDown}
        options={options}
        value={value}
        onChange={onChange}
        pluralizeOptions={pluralizeOptions}
        placeholder={filterPlaceholder}
        disabled={disabled}
      />
    </div>
  );
};

type SearchFilterProps = {
  /** Массив возможных вариантов для выбора */
  options: Option[];
  /** Текущие выбранные значения поля, может быть пустым */
  value: Option[];
  /** Callback, вызываемый при выборе варианта */
  onChange: (value: Option[]) => void;
  /** Преобразовать выбранные значения в строку. Отображается в дропдауне в качестве выбранного значения */
  pluralizeOptions: (value: Option[]) => string;
  /** Заблокирован ли дропдаун */
  disabled?: boolean;
  textContent?: string;
};
