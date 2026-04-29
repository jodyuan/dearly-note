import { useState, useCallback } from 'react'
import { DEARLY_DATA } from '../../constants/data'
import { pickRandom } from '../../lib/utils'

/**
 * Encapsulates all note selection logic.
 * App.jsx becomes a pure layout shell; no business logic leaks into the UI layer.
 */
export function useNote(initialCategory = 'daily') {
  const [category, setCategory] = useState(initialCategory)
  const [note, setNote] = useState(() => pickRandom(DEARLY_DATA[initialCategory]))

  const selectCategory = useCallback((cat) => {
    setCategory(cat)
    setNote(pickRandom(DEARLY_DATA[cat]))
  }, [])

  const drawAnother = useCallback(() => {
    setNote(pickRandom(DEARLY_DATA[category]))
  }, [category])

  return { category, note, selectCategory, drawAnother }
}