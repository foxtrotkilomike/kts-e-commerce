import { CategoryModelApi } from "@store/models/platziStore";

export type Product = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: CategoryModelApi;
  images: string[];
};
