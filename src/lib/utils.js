/**
 * Returns a random item from an array.
 * Generic and reusable — no app-specific logic here.
 */
export function pickRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)]
}

/**
 * Generates static wall detail data.
 * Called once at module level so the wall never re-seeds on re-render.
 */
export function generateWallDetails() {
  return {
    pores: Array.from({ length: 60 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      r: Math.random() * 1.4 + 0.3,
      op: Math.random() * 0.06 + 0.02,
    })),
    veins: Array.from({ length: 12 }, (_, i) => ({
      id: i,
      x1: Math.random() * 100,
      y1: Math.random() * 100,
      x2: Math.random() * 100,
      y2: Math.random() * 100,
      op: Math.random() * 0.04 + 0.01,
    })),
  }
}