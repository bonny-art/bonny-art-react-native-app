import { RootState } from "@/store";

/**
 * Returns the array of cart items from the store.
 */
export const selectCartItems = (state: RootState) => state.cart.items;

/**
 * Calculates the total quantity of items currently in the cart.
 */
export const selectCartCount = (state: RootState) =>
  state.cart.items.reduce((sum, it) => sum + it.qty, 0);
