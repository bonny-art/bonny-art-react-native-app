import { configureStore } from "@reduxjs/toolkit";
import {
  cartReducer,
  cartListenerMiddleware,
  loadCart,
} from "@/features/cart/model/cartSlice";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
  middleware: (getDefault) =>
    getDefault().prepend(cartListenerMiddleware.middleware),
});

store.dispatch(loadCart());

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
