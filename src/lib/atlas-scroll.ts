interface CardBounds {
  top: number;
  height: number;
}

const unit = (value: number) => Math.max(0, Math.min(1, value));

/** A card drives its own image. On mobile the transition ends when the card's
 * bottom meets the viewport bottom, regardless of wrapping, zoom or direction. */
export function atlasScrollState(
  cards: CardBounds[],
  viewportHeight: number,
  imageBottom: number,
  mobile: boolean,
) {
  const entryLine = mobile ? viewportHeight : viewportHeight * 0.65;
  const entered = cards.map(({ top, height }) => unit((entryLine - top) / Math.max(1, height)));
  const progress = cards.length > 1 ? entered.slice(1).reduce((a, b) => a + b, 0) / (cards.length - 1) : 0;
  return {
    progress,
    photos: cards.map((_, i) => (i ? entered[i] : 1) - (entered[i + 1] ?? 0)),
    copy: cards.map(({ top, height }) => {
      if (!mobile) return 1;
      const overlap = unit((imageBottom - top) / Math.max(1, height));
      return 1 - overlap;
    }),
  };
}
