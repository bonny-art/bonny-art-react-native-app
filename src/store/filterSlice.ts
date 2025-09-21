import {
  createSlice,
  PayloadAction,
  createAsyncThunk,
  createListenerMiddleware,
} from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";

const STORAGE_KEY = "filters";

export type RangeValue = { min: number; max: number | null };

export type CategoryFilters = {
  colors?: RangeValue[];
  size?: RangeValue[];
  blends?: ("pure" | "mixed")[];
};

interface FiltersState {
  byCategory: Record<string, CategoryFilters>;
}

const initialState: FiltersState = { byCategory: {} };

/**
 * Restores persisted filter selections keyed by category.
 */
export const loadFilters = createAsyncThunk("filters/load", async () => {
  const raw = await AsyncStorage.getItem(STORAGE_KEY);
  return raw ? (JSON.parse(raw) as FiltersState["byCategory"]) : {};
});

/**
 * Slice handling saved filters per catalog category.
 */
const slice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setFilters(
      state,
      action: PayloadAction<{ categoryId: string; filters: CategoryFilters }>
    ) {
      state.byCategory[action.payload.categoryId] = action.payload.filters;
    },
    clearFilters(state, action: PayloadAction<string>) {
      delete state.byCategory[action.payload];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loadFilters.fulfilled, (state, action) => {
      state.byCategory = action.payload;
    });
  },
});

export const { setFilters, clearFilters } = slice.actions;
export const filtersReducer = slice.reducer;

/**
 * Middleware persisting filter adjustments to AsyncStorage.
 */
export const filtersListenerMiddleware = createListenerMiddleware();

/**
 * Stores the filter state map to persistent storage.
 */
const persist = async (filters: FiltersState["byCategory"]) => {
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(filters));
};

filtersListenerMiddleware.startListening({
  matcher: (action) => setFilters.match(action) || clearFilters.match(action),
  effect: async (_action, api) => {
    const state = api.getState() as { filters: FiltersState };
    await persist(state.filters.byCategory);
  },
});

export type { FiltersState };
