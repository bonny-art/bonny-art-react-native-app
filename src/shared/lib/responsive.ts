import { Dimensions, PixelRatio } from "react-native";

const guidelineWidth = 375; // базовий макет (iPhone 11/12)
const guidelineHeight = 812;

const clamp = (n: number, min: number, max: number) =>
  Math.min(max, Math.max(min, n));
const round = (n: number) => PixelRatio.roundToNearestPixel(n);

export const getScales = () => {
  const { width, height } = Dimensions.get("window");

  // коефіцієнти з «зажимом», щоб на планшетах не роздувало занадто
  const kW = clamp(width / guidelineWidth, 0.85, 1.25);
  const kH = clamp(height / guidelineHeight, 0.85, 1.25);

  const scale = (size: number) => round(size * kW); // по ширині
  const vscale = (size: number) => round(size * kH); // по висоті
  const mscale = (size: number, factor = 0.5) =>
    round(size + (scale(size) - size) * factor); // помірний

  return { scale, vscale, mscale };
};

const { scale, vscale, mscale } = getScales();
export { scale, vscale, mscale };
