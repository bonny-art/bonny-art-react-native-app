import {
  createSlice,
  PayloadAction,
  createAsyncThunk,
  createListenerMiddleware,
} from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";

const STORAGE_KEY = "cartItems";

export type CartItem = { id: string; quantity: number };

export const loadCart = createAsyncThunk<CartItem[]>("cart/load", async () => {
  const raw = await AsyncStorage.getItem(STORAGE_KEY);
  return raw ? (JSON.parse(raw) as CartItem[]) : [];
});

export interface CartState {
  items: CartItem[];
}

const initialState: CartState = {
  items: [],
};

const slice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, action: PayloadAction<string>) {
      const existing = state.items.find((i) => i.id === action.payload);
      if (existing) {
        existing.quantity += 1;
      } else {
        state.items.push({ id: action.payload, quantity: 1 });
      }
    },
    removeItem(state, action: PayloadAction<string>) {
      state.items = state.items.filter((it) => it.id !== action.payload);
    },
    updateQuantity(
      state,
      action: PayloadAction<{ id: string; quantity: number }>
    ) {
      const item = state.items.find((i) => i.id === action.payload.id);
      if (item) {
        item.quantity = action.payload.quantity;
        if (item.quantity <= 0) {
          state.items = state.items.filter((i) => i.id !== action.payload.id);
        }
      }
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

export const { addItem, removeItem, updateQuantity, clear } = slice.actions;
export const cartReducer = slice.reducer;

// persist cart changes
export const cartListenerMiddleware = createListenerMiddleware();

const persist = async (items: CartItem[]) => {
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(items));
};

cartListenerMiddleware.startListening({
  matcher: (action) =>
    addItem.match(action) ||
    removeItem.match(action) ||
    updateQuantity.match(action) ||
    clear.match(action),
  effect: async (_action, api) => {
    const state = api.getState() as { cart: CartState };
    await persist(state.cart.items);
  },
});
