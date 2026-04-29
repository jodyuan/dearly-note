import { motion } from 'framer-motion'

export default function Header() {
  return (
    <header className="text-center">
      <motion.h1
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.15 }}
        className="font-script leading-none text-stone-700/90 mb-3"
        style={{
          fontSize: 'clamp(3.5rem, 10vw, 5.5rem)',
          fontFamily: "'Pinyon Script', cursive",
          textShadow: '0 2px 12px rgba(80,55,35,0.10)',
        }}
      >
        dearly note
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.35 }}
        className="font-serif italic text-base md:text-lg text-stone-500/80 tracking-wide"
      >
        reminders for the days that need them
      </motion.p>
    </header>
  )
}