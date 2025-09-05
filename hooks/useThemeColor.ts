import { useColorScheme } from "@/hooks/useColorScheme";
import { palette } from "@/constants/palette";

type ThemeName = keyof typeof palette; // 'light' | 'dark'
type PaletteTheme = (typeof palette)["light"] | (typeof palette)["dark"];

/**
 * Використання:
 * const text = useThemeColor({}, p => p.neutral.dark.lightest);
 * const accent = useThemeColor({}, p => p.highlight.medium);
 * з перекриттям:
 * const bg = useThemeColor({ light: '#fff', dark: '#000' }, p => p.neutral.light.medium);
 */
export function useThemeColor(
  props: Partial<Record<ThemeName, string>>,
  selector: (p: PaletteTheme) => string
) {
  const scheme = (useColorScheme() ?? "light") as ThemeName;

  // якщо в пропсах передано явний колір для поточної теми — віддаємо його
  const override = props[scheme];
  if (override) return override;

  // інакше беремо з palette за селектором
  return selector(palette[scheme]);
}
