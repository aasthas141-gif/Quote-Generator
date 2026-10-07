export const CATEGORIES = [
  "Motivation",
  "Creativity",
  "Design",
  "Life",
  "Success",
  "Learning",
  "Leadership",
  "Technology",
] as const;

export type Category = (typeof CATEGORIES)[number];
export type CategoryFilter = Category | "All";

export interface Quote {
  id: number;
  text: string;
  author: string;
  category: Category;
}
