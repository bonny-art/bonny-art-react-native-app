export const spacing = {
  xxs: 2,
  xs: 4,
  xsPlus: 6,
  sm: 8,
  smPlus: 10,
  md: 12,
  mdPlus: 14,
  lg: 16,
  lgPlus: 20,
  xl: 24,
  xxl: 32,
  xxxl: 40,
  huge: 48,
  massive: 56,
  giant: 72,
} as const;

export const radius = {
  xs: 4,
  sm: 8,
  md: 12,
  mdPlus: 14,
  lg: 16,
  xl: 20,
  badge: 17,
  pill: 999,
} as const;

export const stroke = {
  hairline: 1,
  thin: 1.5,
  medium: 2,
} as const;

export const sizes = {
  control: {
    sm: 36,
    md: 40,
    mdPlus: 44,
    lg: 48,
    lgPlus: 52,
    xl: 56,
  },
  icon: {
    xs: 12,
    sm: 16,
    md: 18,
    lg: 20,
    lgPlus: 22,
    xl: 24,
  },
  indicator: {
    xs: 6,
    sm: 10,
  },
  badge: {
    sm: 16,
    md: 18,
    lg: 24,
    filter: 33,
  },
  avatar: {
    diameter: {
      sm: 40,
      md: 56,
      lg: 80,
    },
    radius: {
      sm: 16,
      md: 20,
      lg: 32,
    },
    padding: {
      sm: { top: 8, right: 8, bottom: 0, left: 8 },
      md: { top: 10, right: 8, bottom: 0, left: 8 },
      lg: { top: 12, right: 10, bottom: 0, left: 10 },
    },
    placeholder: {
      sm: { width: 24, height: 42 },
      md: { width: 40, height: 65 },
      lg: { width: 60, height: 97.76 },
    },
    badge: { size: 24, overlap: 0.15 },
  },
  searchBar: {
    height: 40,
    radius: 20,
    paddingHorizontal: 12,
    icon: 20,
    clearIcon: 18,
  },
  heroCarousel: {
    height: 180,
    dotSize: 6,
    dotSizeActive: 10,
    dotSpacing: 6,
    dotBottomOffset: 10,
    exploreHeight: 215,
  },
  orderStepper: {
    dot: 28,
    dotCompact: 24,
    lineThickness: 2,
    rowGap: 8,
    labelRowGap: 6,
    stepMinWidth: 32,
    horizontalGap: 6,
  },
  iconButton: {
    diameter: {
      sm: 32,
      md: 40,
      lg: 48,
    },
    icon: {
      sm: 16,
      md: 20,
      lg: 24,
    },
    badgeSize: 16,
    badgePaddingX: 4,
    hitSlop: 8,
  },
  checkbox: {
    sm: 18,
    md: 22,
  },
  filterChip: {
    paddingY: 6,
    paddingX: 8,
    gap: 4,
    triggerHeight: 36,
    triggerPaddingTop: 8,
    triggerPaddingBottom: 8,
    triggerPaddingLeft: 12,
    triggerPaddingRight: 8,
    triggerGap: 12,
    counterMinWidth: 18,
    counterHeight: 18,
    counterPaddingX: 6,
  },
  primaryButton: {
    heights: { sm: 40, md: 48, lg: 56 },
  },
  infoBar: { height: 56 },
  cartItem: { image: 72, metaSpacing: 2 },
  textField: { minHeight: 56 },
  textarea: { minHeight: 120 },
  modal: { maxWidth: 360 },
  productModal: { panelOverlap: 16 },
  productCard: {
    tileWidth: 156,
    tileImageHeight: 112,
    favoriteImageHeight: 200,
  },
  screenFooter: {
    height: 64,
    paddingVertical: 12,
  },
} as const;

export const typography = {
  heading: {
    h1: {
      fontFamily: "Marmelad",
      fontSize: 24,
      lineHeight: 28,
      fontWeight: "600",
    },
    h2: {
      fontFamily: "Marmelad",
      fontSize: 18,
      lineHeight: 22,
      fontWeight: "600",
    },
    h3: {
      fontFamily: "Marmelad",
      fontSize: 16,
      lineHeight: 20,
      fontWeight: "600",
    },
    h4: {
      fontFamily: "Marmelad",
      fontSize: 14,
      lineHeight: 18,
      fontWeight: "500",
    },
    h5: {
      fontFamily: "Marmelad",
      fontSize: 12,
      lineHeight: 16,
      fontWeight: "500",
    },
  },
  body: {
    xl: { fontFamily: "Comfortaa", fontSize: 18, lineHeight: 24 },
    l: { fontFamily: "Comfortaa", fontSize: 16, lineHeight: 22 },
    m: { fontFamily: "Comfortaa", fontSize: 14, lineHeight: 20 },
    s: { fontFamily: "Comfortaa", fontSize: 12, lineHeight: 16 },
    xs: { fontFamily: "Comfortaa", fontSize: 10, lineHeight: 14 },
  },
  action: {
    l: {
      fontFamily: "Comfortaa",
      fontSize: 14,
      lineHeight: 18,
      fontWeight: "600",
    },
    m: {
      fontFamily: "Comfortaa",
      fontSize: 12,
      lineHeight: 16,
      fontWeight: "600",
    },
    s: {
      fontFamily: "Comfortaa",
      fontSize: 10,
      lineHeight: 14,
      fontWeight: "600",
    },
  },
  caption: {
    m: {
      fontFamily: "Comfortaa",
      fontSize: 10,
      lineHeight: 14,
      fontStyle: "italic",
    },
  },
} as const;
