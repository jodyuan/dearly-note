/**
 * A single strip of decorative tape.
 * Reusable: pass any color, angle, and side positioning.
 */
export default function TapeStrip({ color, angle, left, right }) {
  return (
    <div
      className="absolute -top-3 z-20 w-16 h-7 opacity-90"
      style={{
        background: color,
        left,
        right,
        transform: `rotate(${angle})`,
        boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
        backgroundImage: `repeating-linear-gradient(
          90deg,
          transparent,
          transparent 2px,
          rgba(255,255,255,0.1) 2px,
          rgba(255,255,255,0.1) 3px
        )`,
      }}
    />
  )
}