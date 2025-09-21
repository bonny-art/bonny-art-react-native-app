import { configureStore } from "@reduxjs/toolkit";
import {
  cartReducer,
  cartListenerMiddleware,
  loadCart,
} from "@/store/cartSlice";
import {
  filtersReducer,
  filtersListenerMiddleware,
  loadFilters,
} from "@/store/filterSlice";
import {
  authReducer,
  authListenerMiddleware,
  loadSession,
} from "@/store/authSlice";
import { searchReducer } from "@/store/searchSlice";

/**
 * Application-wide Redux store wired with domain reducers and middleware.
 */
export const store = configureStore({
  reducer: {
    cart: cartReducer,
    filters: filtersReducer,
    auth: authReducer,
    search: searchReducer,
  },
  middleware: (getDefault) =>
    getDefault().prepend(
      authListenerMiddleware.middleware,
      cartListenerMiddleware.middleware,
      filtersListenerMiddleware.middleware
    ),
});

store.dispatch(loadCart());
store.dispatch(loadFilters());
store.dispatch(loadSession());

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
