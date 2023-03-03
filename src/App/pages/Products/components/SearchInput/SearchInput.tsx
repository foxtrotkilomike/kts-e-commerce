import { ReactComponent as SearchIcon } from "@assets/svg/search.svg";
import Button from "@components/Button";
import Input from "@components/Input";
import { searchButtonText, searchInputPlaceholder } from "@config/data";
import { useProductStoreContext } from "@context/ProductStoreContext";
import QueryParams from "@customTypes/QueryParams";
import rootStore from "@store/RootStore";
import { checkLoadingStatus } from "@utils/checkLoadingStatus";
import { observer } from "mobx-react-lite";

import classes from "./SearchInput.module.scss";

type SearchInputProps = {
  value: string;
  onChange: (value: string) => void;
};

const SearchInput = ({ value, onChange }: SearchInputProps): JSX.Element => {
  const productStore = useProductStoreContext();

  const handleSearchSubmit = () => {
    const title = rootStore.query.getParam(QueryParams.TITLE);

    if (typeof title === "string") {
      productStore.getFilteredProducts({ [QueryParams.TITLE]: title });
    }
  };

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
