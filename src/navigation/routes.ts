// Сталі шляхи (тільки рядки, без params)
export const PATHS = {
  DRAWER: "/(drawer)" as const,
  TABS: "/(drawer)/(tabs)" as const,
  MODALS: "/(modals)" as const,

  // tabs
  TABS_FAVORITES: "/(drawer)/(tabs)/favorites" as const,
  TABS_CART: "/(drawer)/(tabs)/cart" as const,
  TABS_CART_INDEX: "/(drawer)/(tabs)/cart" as const,
  TABS_CART_ORDER: "/(drawer)/(tabs)/cart/order" as const,
  TABS_CART_SUCCESS: "/(drawer)/(tabs)/cart/success" as const,

  // групи/динамічні
  CATEGORY_BY_ID: "/(drawer)/(tabs)/category/[id]" as const,

  MODAL_PRODUCT_BY_ID: "/(modals)/product/[id]" as const,
  MODAL_FILTER: "/(modals)/filter" as const,
  MODAL_SEARCH: "/(modals)/search" as const,
};

// Хелпери для динамічних переходів у стилі expo-router

export const toCategory = (id: string) =>
  ({ pathname: PATHS.CATEGORY_BY_ID, params: { id } } as const);

export const toProductModal = (id: string) =>
  ({ pathname: PATHS.MODAL_PRODUCT_BY_ID, params: { id } } as const);

export const toCartOrder = () => ({ pathname: PATHS.TABS_CART_ORDER } as const);

export const toCartSuccess = () => PATHS.TABS_CART_SUCCESS;
