import type { RootState } from "@/store";
import type { UserCartItem } from "./types";

const EMPTY_FAVORITES: string[] = [];
const EMPTY_CART: UserCartItem[] = [];

/**
 * Returns the entire authentication slice from the root state.
 */
export const selectAuthState = (state: RootState) => state.auth;

/**
 * Checks whether the user has an active session and user object.
 */
export const selectIsAuthenticated = (state: RootState) =>
  Boolean(state.auth.session && state.auth.user);

/**
 * Retrieves the current user object or undefined.
 */
export const selectCurrentUser = (state: RootState) => state.auth.user;

/**
 * Returns the list of favorite product IDs, defaulting to an empty array.
 */
export const selectUserFavorites = (state: RootState) =>
  state.auth.user?.favorites ?? EMPTY_FAVORITES;

/**
 * Alias selector for favorite product IDs.
 */
export const selectFavoriteProductIds = selectUserFavorites;

/**
 * Retrieves the user's cart items, defaulting to an empty array.
 */
export const selectUserCart = (state: RootState) =>
  state.auth.user?.cart ?? EMPTY_CART;

/**
 * Indicates whether authentication initialization is still in progress.
 */
export const selectAuthInitializing = (state: RootState) =>
  state.auth.initializing;

/**
 * Returns the latest authentication error if present.
 */
export const selectAuthError = (state: RootState) => state.auth.error;
