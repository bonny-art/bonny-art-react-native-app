/** Параметри пагінації та сорту (спільні для всіх списків) */
export type PageParams = {
  page?: number; // 1-базована пагінація (MockAPI)
  limit?: number; // скільки елементів на сторінку
  sortBy?: string; // стабільне сортування між сторінками (напр. "id")
  order?: "asc" | "desc"; // напрям сорту
  signal?: AbortSignal; // можливість скасувати запит
};

/** Результат сторінки з метаданими для load-more */
export type PageResult<T> = {
  items: T[];
  page: number;
  limit: number;
  hasMore?: boolean;
  nextPage?: number | null;
};
