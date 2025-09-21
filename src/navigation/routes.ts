// Static paths (string literals without params).
export const PATHS = {
  DRAWER: "/(drawer)" as const,
  TABS: "/(drawer)/(tabs)" as const,
  MODALS: "/(modals)" as const,
  AUTH: "/(auth)" as const,

  AUTH_LOGIN: "/(auth)/login" as const,
  AUTH_SIGN_UP: "/(auth)/sign-up" as const,

  // Tabs
  TABS_FAVORITES: "/(drawer)/(tabs)/favorites" as const,
  TABS_CART_INDEX: "/(drawer)/(tabs)/cart" as const,
  TABS_CART_ORDER: "/(drawer)/(tabs)/cart/order" as const,
  TABS_CART_SUCCESS: "/(drawer)/(tabs)/cart/success" as const,

  // Grouped/dynamic segments
  CATEGORY_BY_ID: "/(drawer)/(tabs)/category/[id]" as const,

  MODAL_PRODUCT_BY_ID: "/(modals)/product/[id]" as const,
  MODAL_FILTER: "/(modals)/filter" as const,
  MODAL_SEARCH: "/(modals)/search" as const,
};

// Segment names (used in name="..." within Stack/Drawer/Tabs).
export const SEGMENTS = {
  // Groups
  DRAWER: "(drawer)" as const,
  TABS: "(tabs)" as const,
  MODALS: "(modals)" as const,
  AUTH: "(auth)" as const,

  // Screens/nested segments inside tabs
  INDEX: "index" as const,
  FAVORITES: "favorites" as const,
  CART: "cart" as const,
  ORDER: "order" as const,
  SUCCESS: "success" as const,
  CATEGORY: "category" as const,
  PROFILE_TRIGGER: "profile-trigger" as const,
  LOGIN: "login" as const,
  SIGN_UP: "sign-up" as const,

  // Modals
  PRODUCT: "product" as const,
  MODALS_PRODUCT_ID: "product/[id]" as const,
  FILTER: "filter" as const,
  SEARCH: "search" as const,
} as const;

/**
 * Builds a location object that redirects to the tabs root.
 */
export const toTabsRoot = () => ({ pathname: PATHS.TABS } as const);

/**
 * Builds a location object for a specific category screen.
 */
export const toCategory = (id: string) =>
  ({ pathname: PATHS.CATEGORY_BY_ID, params: { id } } as const);

/**
 * Builds a location object targeting the product modal.
 */
export const toProductModal = (id: string) =>
  ({ pathname: PATHS.MODAL_PRODUCT_BY_ID, params: { id } } as const);

/**
 * Builds a location object for the cart order step.
 */
export const toCartOrder = () => ({ pathname: PATHS.TABS_CART_ORDER } as const);

/**
 * Builds a location object for the cart success screen with a total value.
 */
export const toCartSuccess = (total: number) =>
  ({
    pathname: PATHS.TABS_CART_SUCCESS,
    params: { total: String(total) },
  } as const);

/**
 * Builds a location object for the search modal, optionally carrying a query.
 */
export const toSearchModal = (categoryId: string, query?: string) =>
  ({
    pathname: PATHS.MODAL_SEARCH,
    params: {
      categoryId,
      ...(query ? { query } : {}),
    },
  } as const);

/**
 * Builds a location object for the filter modal of a category.
 */
export const toFilterModal = (categoryId: string) =>
  ({ pathname: PATHS.MODAL_FILTER, params: { categoryId } } as const);

/**
 * Builds a location object that navigates to the favorites tab.
 */
export const toFavorites = () => ({ pathname: PATHS.TABS_FAVORITES } as const);

/**
 * Builds a location object that navigates to the cart index screen.
 */
export const toCartIndex = () => ({ pathname: PATHS.TABS_CART_INDEX } as const);
