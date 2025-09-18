import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  createAsyncThunk,
  createListenerMiddleware,
  createSlice,
  isAnyOf,
} from "@reduxjs/toolkit";

import {
  createUser,
  fetchUserById,
  fetchUsersByEmail,
  replaceUser,
} from "@/entities/user/api";
import type { User, UserCartItem, UserSession } from "@/entities/user/model";
import { hashPassword } from "@/entities/user/lib";

import type { CartItem, CartState } from "./cartSlice";
import {
  addItem,
  removeItem,
  updateQuantity,
  clear as clearCart,
  setItems as setCartItems,
} from "./cartSlice";

export type AuthStatus = "idle" | "loading" | "authenticated" | "error";

export type AuthState = {
  status: AuthStatus;
  user: User | null;
  session: UserSession | null;
  error: string | null;
  initializing: boolean;
  updating: boolean;
  lastUserSnapshot: User | null;
};

type RootLikeState = {
  auth: AuthState;
  cart: CartState;
};

type RejectValue = string;

const SESSION_STORAGE_KEY = "authSession";

const createSession = (userId: string): UserSession => ({
  userId,
  token: `mock-${userId}-${Date.now()}`,
});

const sanitizeUserCart = (items: UserCartItem[] = []): UserCartItem[] =>
  items
    .map((item) => ({
      productId: String(item?.productId ?? ""),
      qty: Number(item?.qty ?? 0) || 0,
    }))
    .filter((item) => item.productId && item.qty > 0)
    .map((item) => ({ productId: item.productId, qty: Math.round(item.qty) }));

const sortCart = (items: UserCartItem[]): UserCartItem[] =>
  [...items].sort((a, b) => a.productId.localeCompare(b.productId));

const mapLocalCartToUser = (items: CartItem[]): UserCartItem[] =>
  sanitizeUserCart(
    items.map((item) => ({
      productId: String(item.productId),
      qty: Number(item.qty) || 0,
    }))
  );

const mapUserCartToLocal = (items: UserCartItem[]): CartItem[] =>
  sanitizeUserCart(items).map(({ productId, qty }) => ({ productId, qty }));

const mergeCartItems = (
  local: CartItem[],
  remote: UserCartItem[]
): UserCartItem[] => {
  const map = new Map<string, number>();

  sanitizeUserCart(remote).forEach(({ productId, qty }) => {
    map.set(productId, qty);
  });

  sanitizeUserCart(mapLocalCartToUser(local)).forEach(({ productId, qty }) => {
    const current = map.get(productId) ?? 0;
    map.set(productId, current + qty);
  });

  return Array.from(map.entries()).map(([productId, qty]) => ({
    productId,
    qty,
  }));
};

const areUserCartsEqual = (
  a: UserCartItem[] = [],
  b: UserCartItem[] = []
): boolean => {
  const left = sortCart(sanitizeUserCart(a));
  const right = sortCart(sanitizeUserCart(b));
  if (left.length !== right.length) return false;
  return left.every(
    (item, idx) =>
      item.productId === right[idx].productId && item.qty === right[idx].qty
  );
};

const cloneUser = (user: User | null): User | null =>
  user ? (JSON.parse(JSON.stringify(user)) as User) : null;

const initialState: AuthState = {
  status: "idle",
  user: null,
  session: null,
  error: null,
  initializing: true,
  updating: false,
  lastUserSnapshot: null,
};

export const loadSession = createAsyncThunk<
  { session: UserSession; user: User } | null,
  void,
  { rejectValue: RejectValue }
>("auth/loadSession", async (_, { dispatch, rejectWithValue }) => {
  const raw = await AsyncStorage.getItem(SESSION_STORAGE_KEY);
  if (!raw) return null;

  try {
    const session = JSON.parse(raw) as UserSession;
    if (!session?.userId) {
      await AsyncStorage.removeItem(SESSION_STORAGE_KEY);
      return null;
    }
    const user = await fetchUserById(session.userId);
    dispatch(setCartItems(mapUserCartToLocal(user.cart)));
    return { session, user };
  } catch (err: any) {
    await AsyncStorage.removeItem(SESSION_STORAGE_KEY);
    return rejectWithValue(
      err?.message ?? "Failed to restore the previous session"
    );
  }
});

export const registerUser = createAsyncThunk<
  { session: UserSession; user: User },
  { email: string; password: string; name: string },
  { state: RootLikeState; rejectValue: RejectValue }
>("auth/register", async (payload, { getState, dispatch, rejectWithValue }) => {
  const { email, password, name } = payload;
  const existing = await fetchUsersByEmail(email);
  if (existing.length > 0) {
    return rejectWithValue("EMAIL_TAKEN");
  }

  const passwordHash = await hashPassword(password);
  const state = getState();
  const cartPayload = mapLocalCartToUser(state.cart.items);

  try {
    const user = await createUser({
      email,
      passwordHash,
      name,
      favorites: [],
      cart: cartPayload,
    });
    const session = createSession(user.id);
    await AsyncStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(session));
    dispatch(setCartItems(mapUserCartToLocal(user.cart)));
    return { session, user };
  } catch (err: any) {
    return rejectWithValue(err?.message ?? "Failed to sign up user");
  }
});

export const loginUser = createAsyncThunk<
  { session: UserSession; user: User },
  { email: string; password: string },
  { state: RootLikeState; rejectValue: RejectValue }
>(
  "auth/login",
  async ({ email, password }, { getState, dispatch, rejectWithValue }) => {
    const matches = await fetchUsersByEmail(email);
    if (!matches.length) {
      return rejectWithValue("NOT_FOUND");
    }

    const candidate = matches[0];
    const passwordHash = await hashPassword(password);
    if (candidate.passwordHash !== passwordHash) {
      return rejectWithValue("INVALID_CREDENTIALS");
    }

    const state = getState();
    const localCart = state.cart.items;
    const mergedCart = mergeCartItems(localCart, candidate.cart ?? []);

    let user = candidate;
    if (!areUserCartsEqual(candidate.cart, mergedCart)) {
      try {
        user = await replaceUser({ ...candidate, cart: mergedCart });
      } catch (err: any) {
        return rejectWithValue(err?.message ?? "Failed to merge cart");
      }
    }

    const session = createSession(user.id);
    await AsyncStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(session));
    dispatch(setCartItems(mapUserCartToLocal(user.cart)));
    return { session, user };
  }
);

export const logout = createAsyncThunk<void, void, { state: RootLikeState }>(
  "auth/logout",
  async (_, { dispatch }) => {
    await AsyncStorage.removeItem(SESSION_STORAGE_KEY);
    dispatch(clearCart());
  }
);

export const saveUser = createAsyncThunk<
  User,
  { patch: Partial<User> },
  { state: RootLikeState; rejectValue: RejectValue }
>("auth/saveUser", async ({ patch }, { getState, rejectWithValue }) => {
  const { auth } = getState();
  if (!auth.user) {
    return rejectWithValue("NOT_AUTHENTICATED");
  }

  const nextUser: User = {
    ...auth.user,
    ...patch,
    id: auth.user.id,
  };

  try {
    const updated = await replaceUser(nextUser);
    return updated;
  } catch (err: any) {
    return rejectWithValue(err?.message ?? "Failed to update user");
  }
});

export const toggleFavorite = createAsyncThunk<
  void,
  { productId: string },
  { state: RootLikeState; rejectValue: RejectValue }
>(
  "auth/toggleFavorite",
  async ({ productId }, { getState, dispatch, rejectWithValue }) => {
    const user = getState().auth.user;
    if (!user) {
      return rejectWithValue("NOT_AUTHENTICATED");
    }
    const favorites = new Set(user.favorites ?? []);
    if (favorites.has(productId)) favorites.delete(productId);
    else favorites.add(productId);

    try {
      await dispatch(
        saveUser({ patch: { favorites: Array.from(favorites) } })
      ).unwrap();
    } catch (err: any) {
      return rejectWithValue(err?.message ?? "Failed to toggle favorite");
    }
  }
);

const slice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadSession.pending, (state) => {
        state.initializing = true;
        state.error = null;
      })
      .addCase(loadSession.fulfilled, (state, action) => {
        state.initializing = false;
        if (action.payload) {
          state.session = action.payload.session;
          state.user = action.payload.user;
          state.status = "authenticated";
        } else {
          state.session = null;
          state.user = null;
          state.status = "idle";
        }
      })
      .addCase(loadSession.rejected, (state, action) => {
        state.initializing = false;
        state.session = null;
        state.user = null;
        state.status = "idle";
        state.error = action.payload ?? action.error?.message ?? null;
      })
      .addCase(registerUser.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.status = "authenticated";
        state.session = action.payload.session;
        state.user = action.payload.user;
        state.error = null;
        state.initializing = false;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.status = "error";
        state.error = action.payload ?? action.error?.message ?? null;
        state.initializing = false;
      })
      .addCase(loginUser.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = "authenticated";
        state.session = action.payload.session;
        state.user = action.payload.user;
        state.error = null;
        state.initializing = false;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = "error";
        state.error = action.payload ?? action.error?.message ?? null;
        state.initializing = false;
      })
      .addCase(logout.fulfilled, (state) => {
        state.session = null;
        state.user = null;
        state.status = "idle";
        state.error = null;
        state.initializing = false;
      })
      .addCase(saveUser.pending, (state, action) => {
        state.updating = true;
        state.lastUserSnapshot = cloneUser(state.user);
        if (state.user) {
          state.user = {
            ...state.user,
            ...action.meta.arg.patch,
            id: state.user.id,
          };
        }
        state.error = null;
      })
      .addCase(saveUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.updating = false;
        state.lastUserSnapshot = null;
      })
      .addCase(saveUser.rejected, (state, action) => {
        if (state.lastUserSnapshot) {
          state.user = state.lastUserSnapshot;
        }
        state.updating = false;
        state.lastUserSnapshot = null;
        state.error = action.payload ?? action.error?.message ?? null;
      });
  },
});

export const authReducer = slice.reducer;

export const authListenerMiddleware = createListenerMiddleware<RootLikeState>();

authListenerMiddleware.startListening({
  matcher: isAnyOf(
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    setCartItems
  ),
  effect: async (_action, api) => {
    const state = api.getState();
    const user = state.auth.user;
    if (!user) return;

    const desired = mapLocalCartToUser(state.cart.items);
    if (areUserCartsEqual(user.cart, desired)) return;

    try {
      await api.dispatch(saveUser({ patch: { cart: desired } })).unwrap();
    } catch (err) {
      console.warn("authListener: cart sync failed", err);
    }
  },
});
