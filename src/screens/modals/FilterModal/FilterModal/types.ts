import type { RangeValue } from "@/store/filterSlice";

export type FilterModalProps = Record<string, never>;

export type RangeOption = RangeValue & { label: string };

export type BlendOption = "pure" | "mixed";
