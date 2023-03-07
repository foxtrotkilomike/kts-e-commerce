import React, { useCallback, useEffect, useState } from "react";

import Wrapper from "@components/Wrapper";
import {
  DEFAULT_CATEGORY_ID,
  DEFAULT_PRODUCTS_OFFSET,
  DEFAULT_SEARCH_VALUE,
} from "@config/constants";
import { searchFilterPlaceholder } from "@config/data";
import { useRootStore } from "@context/RootStore";
import QueryParams from "@customTypes/QueryParams";
import { useLocalStore } from "@hooks/useLocalStore";
import SearchOptionsStore from "@store/SearchOptionsStore";
import checkSearchValue from "@utils/getInitSearchValue";
import { setFilteredSearchParams } from "@utils/setFilteredSearchParams";
import { observer } from "mobx-react-lite";
import { useSearchParams } from "react-router-dom";

import classes from "./Search.module.scss";
import SearchFilter from "../SearchFilter";
import SearchInput from "../SearchInput";

const Search = (): JSX.Element => {
  const rootStore = useRootStore();
  const searchValueInit = rootStore.query.getParam(QueryParams.TITLE);
  const optionsStore = useLocalStore(() => new SearchOptionsStore());
  const { options, selectedOption, setSelectedOption } = optionsStore;
  const [searchValue, setSearchValue] = useState(
    checkSearchValue(searchValueInit)
  );
  const [_, setSearchParams] = useSearchParams();

  const handleSearchSubmit = useCallback(() => {
    setFilteredSearchParams(
      {
        [QueryParams.TITLE]:
          searchValue === DEFAULT_SEARCH_VALUE ? null : searchValue,
        [QueryParams.CATEGORY_ID]:
          selectedOption === DEFAULT_CATEGORY_ID ? null : selectedOption,
        [QueryParams.OFFSET]: DEFAULT_PRODUCTS_OFFSET,
      },
      setSearchParams
    );
  }, [searchValue, selectedOption, setSearchParams]);

  useEffect(() => {
    const submitSearch = (e: KeyboardEvent) => {
      if (e.key === "Enter") {
        handleSearchSubmit();
      }
    };

    window.addEventListener("keydown", submitSearch);

    return () => window.removeEventListener("keydown", submitSearch);
  }, [handleSearchSubmit]);

  useEffect(() => {
    setSearchValue(checkSearchValue(searchValueInit));
  }, [searchValueInit]);

  return (
    <Wrapper centered>
      <section className={classes.search}>
        <SearchInput
          value={searchValue}
          onChange={setSearchValue}
          onSubmit={handleSearchSubmit}
        />
        <SearchFilter
          placeholder={searchFilterPlaceholder}
          options={options}
          value={selectedOption}
          onChange={setSelectedOption}
        />
      </section>
    </Wrapper>
  );
};

export default observer(Search);
