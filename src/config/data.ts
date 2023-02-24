import mockProductImage from "@assets/mockProduct.jpg";
import { Option } from "@components/MultiDropdown";
import {
  DEFAULT_CATEGORY_ID,
  DEFAULT_PRODUCT_ID,
  Routes,
} from "@config/constants";

import { HeaderNavItem, HeroContent, Pages, Product } from "./types";

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
const productsMock: Product = {
  id: DEFAULT_PRODUCT_ID,
  title: "",
  price: 0,
  description: "",
  category: {
    id: DEFAULT_CATEGORY_ID,
    name: "",
    image: mockProductImage,
  },
  images: [mockProductImage],
};

const relatedItemsHeading = "Related Items";
enum ProductPageButtonsText {
  BUY = "Buy Now",
  ADD_CART = "Add to Cart",
}

const productListEndMessage = "Yay! You have seen it all";

export {
  headerNavItems,
  heroContent,
  searchInputPlaceholder,
  searchButtonText,
  searchFilterOptions,
  productsListHeading,
  productsMock,
  relatedItemsHeading,
  ProductPageButtonsText,
  productListEndMessage,
};
