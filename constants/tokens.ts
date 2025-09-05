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
    h1: { fontSize: 24, lineHeight: 28, fontWeight: "700" },
    h2: { fontSize: 18, lineHeight: 22, fontWeight: "600" },
    h3: { fontSize: 16, lineHeight: 20, fontWeight: "600" },
    h4: { fontSize: 14, lineHeight: 18, fontWeight: "500" },
    h5: { fontSize: 12, lineHeight: 16, fontWeight: "500" },
  },
  body: {
    xl: { fontSize: 18, lineHeight: 24 },
    l: { fontSize: 16, lineHeight: 22 },
    m: { fontSize: 14, lineHeight: 20 },
    s: { fontSize: 12, lineHeight: 16 },
    xs: { fontSize: 10, lineHeight: 14 },
  },
  action: {
    l: { fontSize: 14, lineHeight: 18, fontWeight: "600" },
    m: { fontSize: 12, lineHeight: 16, fontWeight: "600" },
    s: { fontSize: 10, lineHeight: 14, fontWeight: "600" },
  },
  caption: {
    m: { fontSize: 10, lineHeight: 14, fontStyle: "italic" },
  },
} as const;
