import { ReactComponent as SearchIcon } from "@assets/svg/search.svg";
import Button from "@components/Button";
import Input from "@components/Input";
import { searchButtonText, searchInputPlaceholder } from "@config/data";
import { useProductStoreContext } from "@context/ProductStoreContext";
import { checkLoadingStatus } from "@utils/checkLoadingStatus";
import fetchFilteredProducts from "@utils/fetchFilteredProducts";
import { observer } from "mobx-react-lite";

import classes from "./SearchInput.module.scss";

type SearchInputProps = {
  value: string;
  onChange: (value: string) => void;
};

const SearchInput = ({ value, onChange }: SearchInputProps): JSX.Element => {
  const productStore = useProductStoreContext();

  const handleSearchSubmit = () => fetchFilteredProducts(productStore);

  const isLoading = checkLoadingStatus(productStore.productsLoadingStatus);

  return (
    <div className={classes["search-input"]}>
      <SearchIcon className={classes["search-input__icon"]} />
      <Input
        className={classes["search-input__input"]}
        placeholder={searchInputPlaceholder}
        value={value}
        onChange={onChange}
      />
      <Button
        className={classes["search-input__button"]}
        onClick={handleSearchSubmit}
        loading={isLoading}
      >
        {searchButtonText}
      </Button>
    </div>
  );
};

export default observer(SearchInput);
