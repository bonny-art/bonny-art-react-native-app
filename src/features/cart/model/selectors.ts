import { RootState } from "@/store";

export const selectCartItems = (state: RootState) => state.cart.items;
export const selectCartCount = (state: RootState) =>
  state.cart.items.reduce((sum, it) => sum + it.qty, 0);
