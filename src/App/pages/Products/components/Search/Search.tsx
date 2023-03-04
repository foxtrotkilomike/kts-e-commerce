import React, { useState } from "react";

import Wrapper from "@components/Wrapper";
import {
  searchFilterOptions as initialOptions,
  searchFilterPlaceholder,
} from "@config/data";
import { Option } from "@customTypes/Option";
import QueryParams from "@customTypes/QueryParams";
import getInitSearchValue from "@utils/getInitSearchValue";
import { observer } from "mobx-react-lite";
import { useSearchParams } from "react-router-dom";

import classes from "./Search.module.scss";
import SearchFilter from "../SearchFilter";
import SearchInput from "../SearchInput";

const Search = (): JSX.Element => {
  const [searchValue, setSearchValue] = useState(getInitSearchValue);
  const [searchFilterOption, setSearchFilterOption] =
    useState<Option["key"]>("");
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
          value={searchFilterOption}
          onChange={setSearchFilterOption}
        />
      </section>
    </Wrapper>
  );
};

export default observer(Search);
