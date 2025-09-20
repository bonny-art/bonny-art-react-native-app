import type { UnknownOutputParams } from "expo-router";

export type CategorySearchParams = UnknownOutputParams & {
  categoryId?: string | string[];
  query?: string | string[];
};
