import { motion } from 'framer-motion';

/** One periodic-table cell — also serves the "57–71" / "89–103" placeholders. */
export const ElementTile = ({ item, color, onOpen, onHoverStart, onHoverEnd, dim, isMatch, isSearched }) => {
  if (item.span) {
    return (
      <div
        className="zp-placeholder"
        style={{ gridColumn: item.x, gridRow: item.y, background: color.bg, color: color.text }}
      >
        <span>{item.span}</span>
      </div>
    );
  }
  return (
    <motion.button
      type="button"
      layoutId={`element-${item.n}`}
      aria-label={`Open ${item.name} details`}
      className={[
        'zp-tile',
        dim ? 'is-dim' : '',
        isMatch ? 'is-matched' : '',
        isSearched ? 'is-searched' : '',
      ].join(' ')}
      style={{
        gridColumn: item.x,
        gridRow: item.y,
        background: color.bg,
        color: color.text,
      }}
      onClick={() => onOpen(item)}
      onMouseEnter={(e) => onHoverStart(item, e)}
      onMouseLeave={onHoverEnd}
    >
      <span className="zp-tile num">{item.n}</span>
      <span className="zp-tile sym">{item.sym}</span>
      <span className="zp-tile name">{item.name}</span>
    </motion.button>
  );
};

export default ElementTile;
