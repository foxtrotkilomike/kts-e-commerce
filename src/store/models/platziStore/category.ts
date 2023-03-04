import { Option } from "@customTypes/Option";

export type CategoryModelApi = {
  id: number;
  name: string;
  image: string;
};

export const normalizeCategoriesToOptions = (
  categories: CategoryModelApi[]
): Option[] => {
  return categories.map((category) => ({
    key: category.id,
    value: category.name,
  }));
};
