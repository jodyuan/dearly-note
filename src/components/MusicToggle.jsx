import { motion } from 'framer-motion'

export default function MusicToggle({ muted, onToggle, started }) {
  return (
    <motion.button
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, delay: 1.2 }}
      onClick={onToggle}
      aria-label={muted ? 'Unmute background music' : 'Mute background music'}
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 px-4 py-2.5 rounded-full border border-stone-300/30 bg-white/30 backdrop-blur-xl shadow-sm hover:bg-white/50 transition-all duration-300"
    >
      {/* Sound bars */}
      <div className="flex items-end gap-[3px] h-4">
        {[0, 1, 2, 3].map((i) => (
          <motion.span
            key={i}
            className="block w-[3px] rounded-full"
            style={{ background: muted ? '#fffcfc' : '#8a7060' }}
            animate={
              muted
                ? { height: '4px' }
                : {
                    height: ['4px', `${8 + i * 3}px`, '4px'],
                    transition: {
                      duration: 0.8 + i * 0.15,
                      repeat: Infinity,
                      ease: 'easeInOut',
                      delay: i * 0.1,
                    },
                  }
            }
          />
        ))}
      </div>

      {/* Label */}
      <span
        className="font-sans text-xs lowercase tracking-wide transition-colors duration-300"
        style={{ color: muted ? '#fffcfc' : '#8a7060' }}
      >
        {!started ? 'tap to play' : muted ? 'muted' : 'playing'}
      </span>
    </motion.button>
  )
}