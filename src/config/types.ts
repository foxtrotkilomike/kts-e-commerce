import { Routes } from "@config/constants";

enum Pages {
  MAIN = "main",
  CATEGORIES = "categories",
  ABOUT = "about",
}

type HeaderNavItem = {
  text: string;
  link: Routes;
};

type HeroContent = { heading: string; caption: string };

type PagesHeroContent = Partial<Record<Pages, HeroContent>>;

type Category = {
  id: number;
  name: string;
  image: string;
};

type Product = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: Category;
  images: string[];
};

type Endpoint = {
  base: string;
  [key: string]: string;
};

type ApiError = {
  code: number;
  message: string;
};

export { Pages };
export type {
  HeaderNavItem,
  HeroContent,
  PagesHeroContent,
  Category,
  Product,
  Endpoint,
  ApiError,
};
