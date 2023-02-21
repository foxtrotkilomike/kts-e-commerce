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

export { Pages };
export type { HeaderNavItem };
