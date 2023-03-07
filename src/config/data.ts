import { Routes } from "@config/constants";
import HeaderNavItem from "@customTypes/HeaderNavItem";
import HeroContent from "@customTypes/HeroContent";
import Pages from "@customTypes/Pages";
import PagesHeroContent from "@customTypes/PagesHeroContent";

const headerNavItems: HeaderNavItem[] = [
  {
    text: "Products",
    link: Routes.MAIN,
  },
  {
    text: "Categories",
    link: Routes.CATEGORIES,
  },
  {
    text: "About Us",
    link: Routes.ABOUT,
  },
];

const heroContent: PagesHeroContent = {
  [Pages.MAIN]: {
    heading: "Products",
    caption:
      "We display products based on the latest products we have, if you want to see our old products please enter the name of the item",
  },
};
const defaultHeroContent: HeroContent = {
  heading: "",
  caption: "",
};

const searchInputPlaceholder = "Search";
const searchButtonText = "Find Now";
const searchFilterPlaceholder = "Filter";

const productsListHeading = "Total Products";

const relatedItemsHeading = "Related Items";
enum ProductPageButtonsText {
  BUY = "Buy Now",
  ADD_CART = "Add to Cart",
}

const productListEndMessage = "Yay! You have seen it all!";
const emptyContentTextContent = "Products not found";

enum ErrorMessages {
  PAGE_NOT_EXIST = "This page doesn't exist",
  NOT_AUTHORIZED = "You are not authorized to view this page",
  UNEXPECTED_ERR = "Sorry, an unexpected error has occurred",
}

const LOGO_TEXT = "Lalasia";

enum Currency {
  DOLLAR = "$",
  EURO = "€",
}

export {
  headerNavItems,
  heroContent,
  defaultHeroContent,
  searchInputPlaceholder,
  searchButtonText,
  searchFilterPlaceholder,
  productsListHeading,
  relatedItemsHeading,
  ProductPageButtonsText,
  productListEndMessage,
  emptyContentTextContent,
  ErrorMessages,
  LOGO_TEXT,
  Currency,
};
