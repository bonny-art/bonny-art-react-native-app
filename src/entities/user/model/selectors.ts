import type { RootState } from "@/store";

export const selectAuthState = (state: RootState) => state.auth;

export const selectIsAuthenticated = (state: RootState) =>
  Boolean(state.auth.session && state.auth.user);

export const selectCurrentUser = (state: RootState) => state.auth.user;

export const selectUserFavorites = (state: RootState) =>
  state.auth.user?.favorites ?? [];

export const selectFavoriteProductIds = selectUserFavorites;

export const selectUserCart = (state: RootState) => state.auth.user?.cart ?? [];

export const selectAuthInitializing = (state: RootState) =>
  state.auth.initializing;

export const selectAuthError = (state: RootState) => state.auth.error;
