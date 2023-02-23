import mockProductImage from "@assets/Rectangle23.jpg";
import { Option } from "@components/MultiDropdown";
import { Routes } from "@config/constants";

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
const productsMock: Product[] = [
  {
    id: 0,
    title: "Handmade Fresh Table",
    price: 687,
    description: "Andy shoes are designed to keeping in the description",
    category: {
      id: 5,
      name: "Table",
      image: mockProductImage,
    },
    images: [mockProductImage, mockProductImage, mockProductImage],
  },
  {
    id: 1,
    title: "Wooden Cupboard 3 Row",
    price: 12.86,
    description: "Combination of wood and wool",
    category: {
      id: 2,
      name: "Cupboard",
      image: mockProductImage,
    },
    images: [mockProductImage, mockProductImage, mockProductImage],
  },
  {
    id: 2,
    title: "Minimalist Lounge Chair",
    price: 28.92,
    description: "Combination of wood and wool",
    category: {
      id: 3,
      name: "Chair",
      image: mockProductImage,
    },
    images: [mockProductImage, mockProductImage, mockProductImage],
  },
  {
    id: 3,
    title: "Working Desk Setup",
    price: 38.61,
    description: "Andy shoes are designed to keeping in the description",
    category: {
      id: 5,
      name: "Table",
      image: mockProductImage,
    },
    images: [mockProductImage, mockProductImage, mockProductImage],
  },
  {
    id: 4,
    title: "Minimalist White Cupboard",
    price: 687,
    description:
      "Some new furniture caption which is very long and dull but it has to be there for some reason",
    category: {
      id: 5,
      name: "Others",
      image: mockProductImage,
    },
    images: [mockProductImage, mockProductImage, mockProductImage],
  },
  {
    id: 5,
    title: "Wooden Dining Table",
    price: 421,
    description: "Andy shoes are designed to keeping in the description",
    category: {
      id: 5,
      name: "Table",
      image: mockProductImage,
    },
    images: [mockProductImage, mockProductImage, mockProductImage],
  },
  {
    id: 6,
    title: "White Minimalist Vase",
    price: 18.9,
    description: "Combination of wood and wool",
    category: {
      id: 5,
      name: "Others",
      image: mockProductImage,
    },
    images: [mockProductImage, mockProductImage, mockProductImage],
  },
  {
    id: 7,
    title: "Plant With Clay Stand",
    price: 79.8,
    description: "Combination of wood and wool",
    category: {
      id: 5,
      name: "Others",
      image: mockProductImage,
    },
    images: [mockProductImage, mockProductImage, mockProductImage],
  },
  {
    id: 8,
    title: "Oval Gold Mirror",
    price: 346,
    description: "Andy shoes are designed to keeping in the description",
    category: {
      id: 5,
      name: "Others",
      image: mockProductImage,
    },
    images: [mockProductImage, mockProductImage, mockProductImage],
  },
];

const relatedItemsHeading = "Related Items";
enum ProductPageButtonsText {
  BUY = "Buy Now",
  ADD_CART = "Add to Cart",
}

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
};
