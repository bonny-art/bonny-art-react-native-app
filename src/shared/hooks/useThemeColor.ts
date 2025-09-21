import { useTheme } from "@/providers/theme/ThemeContext";
import { palette } from "@shared/config";

type ThemeName = keyof typeof palette; // 'light' | 'dark'
type PaletteTheme = (typeof palette)["light"] | (typeof palette)["dark"];

/**
 * Picks a color from the current theme with optional overrides.
 *
 * Usage:
 * const text = useThemeColor({}, p => p.neutral.dark.lightest);
 * const accent = useThemeColor({}, p => p.highlight.medium);
 *
 * with overrides:
 * const bg = useThemeColor({ light: '#fff', dark: '#000' }, p => p.neutral.light.medium);
 */
export function useThemeColor(
  props: Partial<Record<ThemeName, string>>,
  selector: (p: PaletteTheme) => string
) {
  const { currentTheme } = useTheme();

  const override = props[currentTheme];
  if (override) return override;

  return selector(palette[currentTheme]);
}
