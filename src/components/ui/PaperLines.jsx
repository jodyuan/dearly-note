/**
 * Decorative ruled lines that give the card a notebook feel.
 */
export default function PaperLines({ color, lineCount = 16, topOffset = '105px' }) {
  return (
    <div
      className="absolute inset-0 pointer-events-none"
      style={{ paddingTop: topOffset }}
    >
      {Array.from({ length: lineCount }, (_, i) => (
        <div
          key={i}
          className="w-full opacity-[0.05]"
          style={{ height: '1px', background: color, marginBottom: '38px' }}
        />
      ))}
    </div>
  )
}