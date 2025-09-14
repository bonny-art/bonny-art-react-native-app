import type { RangeValue } from "@/store/filterSlice";

export type RangeOption = RangeValue & { label: string };

const createColorOptions = (): RangeOption[] => {
  const arr: RangeOption[] = [{ label: "< 100", min: 0, max: 100 }];
  for (let from = 101; from <= 191; from += 10) {
    arr.push({ label: `${from}-${from + 9}`, min: from, max: from + 9 });
  }
  arr.push({ label: "> 200", min: 201, max: null });
  return arr;
};

const createSizeOptions = (): RangeOption[] => {
  const arr: RangeOption[] = [{ label: "< 200", min: 0, max: 200 }];
  for (let from = 201; from <= 901; from += 100) {
    arr.push({ label: `${from}-${from + 99}`, min: from, max: from + 99 });
  }
  arr.push({ label: "> 1000", min: 1001, max: null });
  return arr;
};

export const COLOR_OPTIONS = createColorOptions();
export const SIZE_OPTIONS = createSizeOptions();
export const BLEND_OPTIONS = ["pure", "mixed"] as const;
