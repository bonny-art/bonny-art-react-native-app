/**
 * Returns a shuffled subset of the provided array containing up to `n` items.
 */
export function pickRandom<T>(arr: T[], n: number): T[] {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy.slice(0, n);
}

/**
 * Wraps the slides array so the carousel can seamlessly loop from end to start.
 */
export function makeLoopData<T>(slides: T[]): T[] {
  if (slides.length < 2) return slides;
  return [slides[slides.length - 1], ...slides, slides[0]];
}

/**
 * Produces a memoized `getItemLayout` callback for a horizontal FlatList.
 */
export const getItemLayoutFactory =
  (pageWidth: number) => (_: any, index: number) => ({
    length: pageWidth,
    offset: pageWidth * index,
    index,
  });
