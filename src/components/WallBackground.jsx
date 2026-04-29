import { motion } from 'framer-motion'
import { CATEGORIES } from '../constants'
import { generateWallDetails } from '../lib/utils'

/** * Static seed generated at load so the texture stays 
 * consistent even when the component re-renders.
 */
const WALL_DETAILS = generateWallDetails()

export default function WallBackground({ category }) {
  const cat = CATEGORIES[category] ?? CATEGORIES.daily
  const { wallTint, lightSpot } = cat

  return (
    <div className="fixed inset-0 z-0" aria-hidden="true">

      {/* Primary wall color and base gradient */}
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(ellipse 140% 120% at 50% -10%, #f0ebe3 0%, #e8e0d4 45%, #ddd5c8 100%)`,
        }}
      />

      {/* Tiny grain layer to break up the flat digital look */}
      <div
        className="absolute inset-0 opacity-[0.55]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`,
          backgroundSize: '300px 300px',
          mixBlendMode: 'multiply',
        }}
      />

      {/* Heavy shadowing at the edges to pull focus inward */}
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(ellipse 85% 80% at 50% 50%,
                       transparent 35%,
                     rgba(60,42,28,0.18) 60%,
                     rgba(45,30,18,0.45) 85%,
                     rgba(30,20,12,0.65) 100%)`,
        }}
      />

      {/* Darkening the bottom to ground the layout */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32"
        style={{ background: 'linear-gradient(to top, rgba(50,38,25,0.18) 0%, transparent 100%)' }}
      />

      {/* Theme-specific color wash applied over the texture */}
      <motion.div
        key={category}
        className="absolute inset-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.8, ease: 'easeInOut' }}
        style={{ background: wallTint, mixBlendMode: 'overlay' }}
      />

      {/* Faking a light source to create depth behind the content */}
      <motion.div
        key={`light-${category}`}
        className="absolute inset-0 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2, ease: 'easeInOut' }}
        style={{
          background: `radial-gradient(ellipse 70% 55% at ${lightSpot.x} ${lightSpot.y}, ${lightSpot.color} 0%, transparent 70%)`,
        }}
      />
    </div>
  )
}