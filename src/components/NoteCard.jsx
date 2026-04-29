import { useRef, useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import html2canvas from 'html2canvas'
import { CATEGORIES } from '../constants/categories'
import TapeStrip from './ui/TapeStrip'
import PaperLines from './ui/PaperLines'

const cardVariants = {
  initial: { opacity: 0, y: 18, rotate: -0.5, scale: 0.97 },
  animate: { opacity: 1, y: 0, rotate: 0, scale: 1 },
  exit: { opacity: 0, y: -12, rotate: 0.5, scale: 1.01 },
}

export default function NoteCard({ text, category }) {
  const s = CATEGORIES[category] ?? CATEGORIES.daily
  const cardRef = useRef(null)
  const [saving, setSaving] = useState(false)

  const handleSave = useCallback(async () => {
    if (!cardRef.current || saving) return
    setSaving(true)

    try {
      const canvas = await html2canvas(cardRef.current, {
        backgroundColor: null,
        scale: 3, // keep it high-res for printing/sharing
        useCORS: true,
        logging: false,
        // stop the button from showing up in its own screenshot
        ignoreElements: (el) => el.dataset.noCapture === 'true',
      })

      const link = document.createElement('a')
      link.download = `dearly-note-${category}.png`
      link.href = canvas.toDataURL('image/png')
      link.click()
    } catch (err) {
      console.error('Save failed:', err)
    } finally {
      setSaving(false)
    }
  }, [saving, category])

  return (
    <motion.div
      variants={cardVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      className="relative w-full max-w-xl mx-auto"
    >
      <TapeStrip color={s.tapeColor} angle="-6deg" left="15%" />
      <TapeStrip color={s.tapeColor} angle="5deg" right="18%" />

      {/* the capture target: currently only wrapping the paper itself */}
      <div
        ref={cardRef}
        className="relative w-full rounded-sm overflow-hidden"
        style={{
          background: s.bg,
          border: `1px solid ${s.border}`,
          boxShadow: `
            0 2px 4px rgba(0,0,0,0.06),
            0 8px 24px rgba(0,0,0,0.10),
            inset 0 1px 0 rgba(255,255,255,0.9)
          `,
        }}
      >
        <PaperLines color={s.accent} />

        <div
          className="absolute top-0 bottom-0 left-[52px] w-px opacity-20"
          style={{ background: s.accent }}
        />

        {/* Using rotate(-90) instead of writing-mode. 
          Writing-mode is a nightmare for html2canvas to render correctly.
        */}
        <div
          className="absolute left-6 top-32 font-sans text-[10px] italic tracking-wider opacity-40 select-none whitespace-nowrap"
          style={{
            color: s.ink,
            transform: 'rotate(-90deg)',
            transformOrigin: 'left top',
            display: 'block'
          }}
        >
          {s.noteLabel}
        </div>

        <button
          data-no-capture="true"
          onClick={handleSave}
          disabled={saving}
          aria-label="Save note as image"
          className="absolute top-4 right-4 z-10 p-2 rounded-full transition-all duration-200 hover:bg-black/5 active:scale-95 disabled:opacity-40"
          style={{ color: s.accent }}
        >
          {saving ? (
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none" className="animate-spin">
              <circle cx="7.5" cy="7.5" r="6" stroke="currentColor" strokeWidth="1.5" strokeDasharray="28" strokeDashoffset="10" strokeLinecap="round" />
            </svg>
          ) : (
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
              <path d="M7.5 2v8m0 0L4.5 7m3 3l3-3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M2.5 12h10" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
            </svg>
          )}
        </button>

        <div className="relative px-10 pt-16 pb-14" style={{ paddingLeft: '84px' }}>
          <p
            className="font-serif text-2xl md:text-3xl leading-[1.7] italic font-light"
            style={{ color: s.ink }}
          >
            {text}
          </p>

          <div className="mt-10 flex flex-col items-end">
            <p
              className="font-script text-3xl opacity-80"
              style={{ color: s.accent, fontFamily: "'Pinyon Script', cursive" }}
            >
              with love ♡
            </p>
          </div>
        </div>
      </div>

      {/* subtle shadow lift so it doesn't look flat against the wall */}
      <div
        className="absolute -bottom-1.5 left-4 right-4 h-3 rounded-b-sm opacity-10 blur-md"
        style={{ background: 'rgba(0,0,0,0.3)' }}
      />
    </motion.div>
  )
}