import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect, useRef } from 'react'

// Types out text character by character.
// onComplete is in a ref so it never triggers a re-run of the effect.
function Typewriter({ text, speed = 55, onComplete }) {
  const [displayed, setDisplayed] = useState('')
  const onCompleteRef = useRef(onComplete)

  useEffect(() => {
    onCompleteRef.current = onComplete
  }, [onComplete])

  useEffect(() => {
    setDisplayed('')
    let i = 0
    const tick = setInterval(() => {
      i++
      setDisplayed(text.slice(0, i))
      if (i >= text.length) {
        clearInterval(tick)
        onCompleteRef.current?.()
      }
    }, speed)
    return () => clearInterval(tick)
  }, [text, speed]) // onComplete intentionally excluded — using ref instead

  return <span>{displayed}</span>
}

export default function WelcomeModal({ visible, onEnter }) {
  const [done, setDone] = useState(false)

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="backdrop"
          className="fixed inset-0 z-[100] flex items-center justify-center cursor-pointer"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2 }}
          style={{ background: 'rgba(26,18,12,0.85)', backdropFilter: 'blur(8px)' }}
          onClick={() => done && onEnter()}
        >
          <div className="max-w-md px-8 flex flex-col items-center text-center gap-8">

            <p className="font-serif italic text-lg md:text-xl leading-relaxed text-stone-400">
              <Typewriter
                text="take a breath and stay a while. you are enough, exactly as you are."
                onComplete={() => setDone(true)}
              />
            </p>

            <AnimatePresence>
              {done && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1.5 }}
                  className="font-sans text-sm italic text-stone-500 transition-colors"
                >
                  continue
                </motion.p>
              )}
            </AnimatePresence>

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}