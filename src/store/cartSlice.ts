import {
  createSlice,
  PayloadAction,
  createAsyncThunk,
  createListenerMiddleware,
} from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";

const STORAGE_KEY = "cartItems";

export type CartItem = { productId: string; qty: number };

type PersistedCartItem =
  | CartItem
  | { id?: string; quantity?: number; productId?: string; qty?: number };

export const loadCart = createAsyncThunk<CartItem[]>("cart/load", async () => {
  const raw = await AsyncStorage.getItem(STORAGE_KEY);
  if (!raw) return [];

  try {
    const parsed = JSON.parse(raw) as PersistedCartItem[];
    return parsed
      .map((item) => {
        const productId = item.productId ?? item.id;
        const qty = item.qty ?? item.quantity ?? 0;
        if (!productId || qty <= 0) return null;
        return { productId, qty } as CartItem;
      })
      .filter((it): it is CartItem => Boolean(it));
  } catch (err) {
    console.warn("loadCart: failed to parse cart", err);
    return [];
  }
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
      const existing = state.items.find((i) => i.productId === action.payload);
      if (existing) {
        existing.qty += 1;
      } else {
        state.items.push({ productId: action.payload, qty: 1 });
      }
    },
    removeItem(state, action: PayloadAction<string>) {
      state.items = state.items.filter((it) => it.productId !== action.payload);
    },
    updateQuantity(
      state,
      action: PayloadAction<{ productId: string; qty: number }>
    ) {
      const item = state.items.find(
        (i) => i.productId === action.payload.productId
      );
      if (item) {
        item.qty = action.payload.qty;
        if (item.qty <= 0) {
          state.items = state.items.filter(
            (i) => i.productId !== action.payload.productId
          );
        }
      }
    },
    clear(state) {
      state.items = [];
    },
    setItems(state, action: PayloadAction<CartItem[]>) {
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loadCart.fulfilled, (state, action) => {
      state.items = action.payload;
    });
  },
});

export const { addItem, removeItem, updateQuantity, clear, setItems } =
  slice.actions;
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
    clear.match(action) ||
    setItems.match(action),
  effect: async (_action, api) => {
    const state = api.getState() as { cart: CartState };
    await persist(state.cart.items);
  },
});
