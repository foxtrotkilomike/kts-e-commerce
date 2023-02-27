import { ReactComponent as SearchIcon } from "@assets/svg/search.svg";
import Button from "@components/Button";
import Input from "@components/Input";
import { searchButtonText, searchInputPlaceholder } from "@config/data";

import classes from "./SearchInput.module.scss";

type SearchInputProps = {
  value: string;
  onChange: (value: string) => void;
};

const SearchInput = ({ value, onChange }: SearchInputProps): JSX.Element => {
  return (
    <div className={classes.searchInput}>
      <SearchIcon className={classes.searchInput__icon} />
      <Input
        className={classes.searchInput__input}
        placeholder={searchInputPlaceholder}
        value={value}
        onChange={onChange}
      />
      <Button className={classes.searchInput__button} loading={false}>
        {searchButtonText}
      </Button>
    </div>
  );
};

export default SearchInput;
