import type { IconName } from "@/shared/ui/IconSymbol";

import type { CategorySortMode } from "./types";

export const CATEGORY_SORT_SEQUENCE: CategorySortMode[] = [
  "default",
  "priceDesc",
  "priceAsc",
];

export const CATEGORY_SORT_ICON_MAP: Record<CategorySortMode, IconName> = {
  default: "sort",
  priceDesc: "chevron-down",
  priceAsc: "chevron-up",
};
