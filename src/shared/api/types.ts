export type PageParams = {
  page?: number;
  limit?: number;
  sortBy?: string;
  order?: "asc" | "desc";
  signal?: AbortSignal;
};

export type PageResult<T> = {
  items: T[];
  page: number;
  limit: number;
  hasMore?: boolean;
  nextPage?: number | null;
};
