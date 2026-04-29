import React from 'react'
import { motion } from 'framer-motion'
import { CATEGORIES } from '../constants/categories'

export default function CategoryNav({ categories, active, onSelect }) {
  return (
    <>
      {/* ── Mobile: styled select dropdown ── */}
      <div className="relative w-48 md:hidden">
        <select
          value={active}
          onChange={(e) => onSelect(e.target.value)}
          className="w-full appearance-none font-sans text-sm lowercase text-center px-5 py-2.5 pr-8 rounded-full border border-stone-300/30 bg-white/40 backdrop-blur-xl shadow-sm focus:outline-none cursor-pointer"
          style={{ color: '#3D2B1F' }}
          aria-label="Note categories"
        >
          {categories.map((key) => (
            <option key={key} value={key}>
              {CATEGORIES[key].label}
            </option>
          ))}
        </select>

        {/* Custom chevron */}
        <div className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2">
          <svg width="10" height="6" viewBox="0 0 10 6" fill="none">
            <path d="M1 1l4 4 4-4" stroke="#8a7060" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>

      {/* ── Desktop: sliding pill row ── */}
      <nav
        className="relative hidden md:flex items-center p-1.5 rounded-full border border-stone-300/30 bg-white/30 backdrop-blur-xl shadow-sm"
        role="tablist"
        aria-label="Note categories"
      >
        {categories.map((key, index) => {
          const cat = CATEGORIES[key]
          const isActive = key === active

          return (
            <React.Fragment key={key}>
              <button
                role="tab"
                aria-selected={isActive}
                onClick={() => onSelect(key)}
                className="relative px-6 py-2.5 font-sans text-sm lowercase transition-colors duration-500 focus:outline-none group"
                style={{ color: isActive ? '#3D2B1F' : '#8a7060' }}
              >
                {isActive && (
                  <motion.div
                    layoutId="active-pill"
                    className="absolute inset-0 bg-white/80 rounded-full shadow-sm z-0"
                    transition={{ type: 'spring', bounce: 0.15, duration: 0.6 }}
                  />
                )}
                <span className="relative z-10 group-hover:opacity-80 transition-opacity">
                  {cat.label}
                </span>
              </button>

              {index < categories.length - 1 && (
                <div className="h-4 w-px bg-stone-400/20" aria-hidden="true" />
              )}
            </React.Fragment>
          )
        })}
      </nav>
    </>
  )
}