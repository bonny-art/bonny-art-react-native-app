import { Dimensions, PixelRatio } from "react-native";

const guidelineWidth = 375; // Base layout size (iPhone 11/12).
const guidelineHeight = 812;

/**
 * Restricts a numeric value to stay between the given minimum and maximum.
 */
const clamp = (n: number, min: number, max: number) =>
  Math.min(max, Math.max(min, n));

/**
 * Rounds a number to the nearest device pixel value.
 */
const round = (n: number) => PixelRatio.roundToNearestPixel(n);

/**
 * Calculates responsive scaling helpers that adapt values to the screen size.
 */
export const getScales = () => {
  const { width, height } = Dimensions.get("window");

  // Scale factors are clamped so tablet layouts do not become overly large.
  const kW = clamp(width / guidelineWidth, 0.85, 1.25);
  const kH = clamp(height / guidelineHeight, 0.85, 1.25);

  const scale = (size: number) => round(size * kW); // Width-based scale helper.
  const vscale = (size: number) => round(size * kH); // Height-based scale helper.
  const mscale = (size: number, factor = 0.5) =>
    round(size + (scale(size) - size) * factor); // Moderated scale helper.

  return { scale, vscale, mscale };
};

const { scale, vscale, mscale } = getScales();

/**
 * Scales size values relative to the device width.
 */
export { scale };

/**
 * Scales size values relative to the device height.
 */
export { vscale };

/**
 * Scales size values with a moderated factor for balanced sizing.
 */
export { mscale };
