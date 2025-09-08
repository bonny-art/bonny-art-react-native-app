import React from "react";
import { useLocalSearchParams } from "expo-router";
import CategoryScreen from "@/features/category/CategoryScreen";

export default function CategoryRoute() {
  const { id } = useLocalSearchParams<{ id: string }>();
  return <CategoryScreen categoryId={String(id)} />;
}
