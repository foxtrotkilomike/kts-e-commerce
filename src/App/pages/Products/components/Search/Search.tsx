import React, { useState } from "react";

import { Option } from "@components/MultiDropdown";
import Wrapper from "@components/Wrapper";
import {
  searchFilterOptions as initialOptions,
  searchFilterPlaceholder,
} from "@config/data";
import QueryParams from "@customTypes/QueryParams";
import getInitSearchValue from "@utils/getInitSearchValue";
import { pluralizeOptions } from "@utils/pluralizeOptions";
import { useSearchParams } from "react-router-dom";

import classes from "./Search.module.scss";
import SearchFilter from "../SearchFilter";
import SearchInput from "../SearchInput";

const Search = (): JSX.Element => {
  const [searchValue, setSearchValue] = useState(getInitSearchValue());
  const [searchFilterOptions, setSearchFilterOptions] = useState<Option[]>([]);
  const [_, setSearchParams] = useSearchParams();

  const handleSearchSubmit = () => {
    setSearchParams({
      [QueryParams.TITLE]: searchValue,
    });
  };

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
          options={initialOptions}
          value={searchFilterOptions}
          onChange={setSearchFilterOptions}
          pluralizeOptions={pluralizeOptions}
        />
      </section>
    </Wrapper>
  );
};

export default React.memo(Search);
