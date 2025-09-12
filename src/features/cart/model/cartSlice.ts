import {
  createSlice,
  PayloadAction,
  createAsyncThunk,
  createListenerMiddleware,
} from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";

const STORAGE_KEY = "cartItems";

export const loadCart = createAsyncThunk<string[]>("cart/load", async () => {
  const raw = await AsyncStorage.getItem(STORAGE_KEY);
  return raw ? (JSON.parse(raw) as string[]) : [];
});

export interface CartState {
  items: string[];
}

const initialState: CartState = {
  items: [],
};

const slice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, action: PayloadAction<string>) {
      if (!state.items.includes(action.payload)) {
        state.items.push(action.payload);
      }
    },
    removeItem(state, action: PayloadAction<string>) {
      state.items = state.items.filter((id) => id !== action.payload);
    },
    clear(state) {
      state.items = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loadCart.fulfilled, (state, action) => {
      state.items = action.payload;
    });
  },
});

export const { addItem, removeItem, clear } = slice.actions;
export const cartReducer = slice.reducer;

// persist cart changes
export const cartListenerMiddleware = createListenerMiddleware();

const persist = async (items: string[]) => {
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(items));
};

cartListenerMiddleware.startListening({
  matcher: (action) =>
    addItem.match(action) || removeItem.match(action) || clear.match(action),
  effect: async (_action, api) => {
    const state = api.getState() as { cart: CartState };
    await persist(state.cart.items);
  },
});
