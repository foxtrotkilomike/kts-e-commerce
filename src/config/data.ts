import { Option } from "@components/MultiDropdown";

import { HeaderNavItem, HeroContent, Pages } from "./types";

const headerNavItems: HeaderNavItem[] = [
  {
    text: "Products",
    link: "#",
    page: Pages.MAIN,
  },
  {
    text: "Categories",
    link: "#",
    page: Pages.CATEGORIES,
  },
  {
    text: "About Us",
    link: "#",
    page: Pages.ABOUT,
  },
];

const heroContent: HeroContent = {
  [Pages.MAIN]: {
    heading: "Products",
    caption:
      "We display products based on the latest products we have, if you want to see our old products please enter the name of the item",
  },
};

const searchInputPlaceholder = "Search";
const searchButtonText = "Find Now";
const searchFilterOptions: Option[] = [
  { key: "chair", value: "Chair" },
  { key: "cupboard", value: "Cupboard" },
  { key: "table", value: "Table" },
  { key: "decoration", value: "Decoration" },
];

const productsListHeading = "Total Products";

export {
  headerNavItems,
  heroContent,
  searchInputPlaceholder,
  searchButtonText,
  searchFilterOptions,
  productsListHeading,
};
