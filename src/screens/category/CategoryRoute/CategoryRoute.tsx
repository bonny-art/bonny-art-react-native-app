import { useLocalSearchParams } from "expo-router";

import { CategoryScreen } from "@/features/category/ui/CategoryScreen";

import { CATEGORY_ROUTE_PARAM_ID } from "./constants";
import type { CategoryRouteParams } from "./types";

export default function CategoryRoute() {
  const params = useLocalSearchParams<CategoryRouteParams>();
  const categoryId = params[CATEGORY_ROUTE_PARAM_ID];

  return <CategoryScreen categoryId={String(categoryId)} />;
}
