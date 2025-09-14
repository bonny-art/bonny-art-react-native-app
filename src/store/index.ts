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

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    filters: filtersReducer,
  },
  middleware: (getDefault) =>
    getDefault().prepend(
      cartListenerMiddleware.middleware,
      filtersListenerMiddleware.middleware
    ),
});

store.dispatch(loadCart());
store.dispatch(loadFilters());

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
