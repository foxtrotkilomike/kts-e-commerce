import { useState } from "react";

import { Option } from "@components/MultiDropdown";
import Wrapper from "@components/Wrapper";

import classes from "./Search.module.scss";
import { searchFilterOptions as initialOptions } from "../../../../../config/data";
import SearchFilter from "../SearchFilter";
import SearchInput from "../SearchInput";

export const Search = (props: SearchProps): JSX.Element => {
  const [searchValue, setSearchValue] = useState("");
  const [searchFilterOptions, setSearchFilterOptions] = useState<Option[]>([]);

  const pluralizeOptions = (options: Option[]) =>
    options.map((option) => option.value).join(", ");

  return (
    <Wrapper centered>
      <section className={classes.search}>
        <SearchInput value={searchValue} onChange={setSearchValue} />
        <SearchFilter
          textContent="Filter"
          options={initialOptions}
          value={searchFilterOptions}
          onChange={setSearchFilterOptions}
          pluralizeOptions={pluralizeOptions}
        />
      </section>
    </Wrapper>
  );
};

type SearchProps = Record<string, string>;
