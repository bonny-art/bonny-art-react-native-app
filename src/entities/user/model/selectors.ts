import type { RootState } from "@/store";
import type { UserCartItem } from "./types";

const EMPTY_FAVORITES: string[] = [];
const EMPTY_CART: UserCartItem[] = [];

export const selectAuthState = (state: RootState) => state.auth;

export const selectIsAuthenticated = (state: RootState) =>
  Boolean(state.auth.session && state.auth.user);

export const selectCurrentUser = (state: RootState) => state.auth.user;

export const selectUserFavorites = (state: RootState) =>
  state.auth.user?.favorites ?? EMPTY_FAVORITES;

export const selectFavoriteProductIds = selectUserFavorites;

export const selectUserCart = (state: RootState) =>
  state.auth.user?.cart ?? EMPTY_CART;

export const selectAuthInitializing = (state: RootState) =>
  state.auth.initializing;

export const selectAuthError = (state: RootState) => state.auth.error;
