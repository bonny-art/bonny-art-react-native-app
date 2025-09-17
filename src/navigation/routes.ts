// Сталі шляхи (тільки рядки, без params)
export const PATHS = {
  DRAWER: "/(drawer)" as const,
  TABS: "/(drawer)/(tabs)" as const,
  MODALS: "/(modals)" as const,
  AUTH: "/(auth)" as const,

  AUTH_LOGIN: "/(auth)/login" as const,
  AUTH_SIGN_UP: "/(auth)/sign-up" as const,

  // tabs
  TABS_FAVORITES: "/(drawer)/(tabs)/favorites" as const,
  TABS_CART_INDEX: "/(drawer)/(tabs)/cart" as const,
  TABS_CART_ORDER: "/(drawer)/(tabs)/cart/order" as const,
  TABS_CART_SUCCESS: "/(drawer)/(tabs)/cart/success" as const,

  // групи/динамічні
  CATEGORY_BY_ID: "/(drawer)/(tabs)/category/[id]" as const,

  MODAL_PRODUCT_BY_ID: "/(modals)/product/[id]" as const,
  MODAL_FILTER: "/(modals)/filter" as const,
  MODAL_SEARCH: "/(modals)/search" as const,
};

// Імена сегментів (для name="..." у Stack/Drawer/Tabs)
export const SEGMENTS = {
  // групи
  DRAWER: "(drawer)" as const,
  TABS: "(tabs)" as const,
  MODALS: "(modals)" as const,
  AUTH: "(auth)" as const,

  // екрани/вкладені сегменти всередині (tabs)
  INDEX: "index" as const,
  FAVORITES: "favorites" as const,
  CART: "cart" as const,
  ORDER: "order" as const,
  SUCCESS: "success" as const,
  CATEGORY: "category" as const,
  PROFILE_TRIGGER: "profile-trigger" as const,
  LOGIN: "login" as const,
  SIGN_UP: "sign-up" as const,

  // (modals)
  PRODUCT: "product" as const,
  MODALS_PRODUCT_ID: "product/[id]" as const,
  FILTER: "filter" as const,
  SEARCH: "search" as const,
} as const;

// Хелпери для динамічних переходів

export const toTabsRoot = () => ({ pathname: PATHS.TABS } as const);

export const toCategory = (id: string) =>
  ({ pathname: PATHS.CATEGORY_BY_ID, params: { id } } as const);

export const toProductModal = (id: string) =>
  ({ pathname: PATHS.MODAL_PRODUCT_BY_ID, params: { id } } as const);

export const toCartOrder = () => ({ pathname: PATHS.TABS_CART_ORDER } as const);

export const toCartSuccess = (total: number) =>
  ({
    pathname: PATHS.TABS_CART_SUCCESS,
    params: { total: String(total) },
  } as const);

export const toSearchModal = () => ({ pathname: PATHS.MODAL_SEARCH } as const);

export const toFilterModal = (categoryId: string) =>
  ({ pathname: PATHS.MODAL_FILTER, params: { categoryId } } as const);

export const toFavorites = () => ({ pathname: PATHS.TABS_FAVORITES } as const);

export const toCartIndex = () => ({ pathname: PATHS.TABS_CART_INDEX } as const);
