import HeroContent from "@customTypes/HeroContent";
import Pages from "@customTypes/Pages";

type PagesHeroContent = Partial<Record<Pages, HeroContent>>;

export default PagesHeroContent;
