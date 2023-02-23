enum Pages {
  MAIN = "main",
  CATEGORIES = "categories",
  ABOUT = "about",
}

type HeaderNavItem = {
  text: string;
  link: string;
  page: Pages;
};

type HeroContent = Partial<Record<Pages, { heading: string; caption: string }>>;

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

export { Pages };
export type { HeaderNavItem, HeroContent, Category, Product };
