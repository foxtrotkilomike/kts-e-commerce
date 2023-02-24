import { useState } from "react";

import { Option } from "@components/MultiDropdown";
import Wrapper from "@components/Wrapper";
import {
  searchFilterOptions as initialOptions,
  searchFilterPlaceholder,
} from "@config/data";
import { pluralizeOptions } from "@utils/pluralizeOptions";

import classes from "./Search.module.scss";
import SearchFilter from "../SearchFilter";
import SearchInput from "../SearchInput";

export const Search = (): JSX.Element => {
  const [searchValue, setSearchValue] = useState("");
  const [searchFilterOptions, setSearchFilterOptions] = useState<Option[]>([]);

  return (
    <Wrapper centered>
      <section className={classes.search}>
        <SearchInput value={searchValue} onChange={setSearchValue} />
        <SearchFilter
          textContent={searchFilterPlaceholder}
          options={initialOptions}
          value={searchFilterOptions}
          onChange={setSearchFilterOptions}
          pluralizeOptions={pluralizeOptions}
        />
      </section>
    </Wrapper>
  );
};
