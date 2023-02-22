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

export { Pages };
export type { HeaderNavItem, HeroContent };
