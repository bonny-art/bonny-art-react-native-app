import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type SearchState = {
  byCategory: Record<string, string>;
};

const initialState: SearchState = {
  byCategory: {},
};

type SetCategorySearchPayload = {
  categoryId: string;
  query: string;
};

/**
 * Slice storing per-category search queries for catalog listings.
 */
const slice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setCategorySearch(state, action: PayloadAction<SetCategorySearchPayload>) {
      const { categoryId, query } = action.payload;
      const trimmed = query.trim();
      if (trimmed) {
        state.byCategory[categoryId] = trimmed;
      } else {
        delete state.byCategory[categoryId];
      }
    },
    clearCategorySearch(state, action: PayloadAction<string>) {
      delete state.byCategory[action.payload];
    },
    resetSearchState() {
      return initialState;
    },
  },
});

export const { setCategorySearch, clearCategorySearch, resetSearchState } =
  slice.actions;

export const searchReducer = slice.reducer;
