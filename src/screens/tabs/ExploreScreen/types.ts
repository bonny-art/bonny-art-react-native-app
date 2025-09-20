import type { Category } from "@/entities/category/model";
import type { Product } from "@/entities/product/model";

export interface CategorySectionData {
  category: Category;
  items: Product[];
}
