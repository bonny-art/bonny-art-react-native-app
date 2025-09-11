export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  xxl: 32,
} as const;

export const radius = {
  sm: 8,
  md: 12,
  lg: 16,
  pill: 999,
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
