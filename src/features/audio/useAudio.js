import { useState, useEffect, useRef, useCallback } from 'react'

/**
 * Browser autoplay policy: audio WITH volume is always blocked.
 * The only reliable workaround is to autoplay MUTED, then fade in
 * volume after the first user interaction.
 *
 * Flow:
 *   1. Audio starts muted + playing immediately on mount (browsers allow this)
 *   2. First user interaction → fade volume in smoothly
 *   3. User can mute/unmute freely after that
 */
export function useAudio(src, { volume = 0.4, fadeInDuration = 2000 } = {}) {
  const audioRef  = useRef(null)
  const fadeRef   = useRef(null)
  const [muted, setMuted]     = useState(true)   // starts muted
  const [started, setStarted] = useState(false)  // true after first interaction

  // Create and immediately play muted audio
  useEffect(() => {
    const audio = new Audio(src)
    audio.loop   = true
    audio.volume = 0
    audio.muted  = true    // belt + suspenders for Safari
    audioRef.current = audio

    audio.play().catch(() => {
      // Even muted autoplay blocked (rare) — interaction will still start it
    })

    return () => {
      audio.pause()
      audio.src = ''
      clearInterval(fadeRef.current)
    }
  }, [src])

  // Fade volume up from 0 to target
  const fadeIn = useCallback((targetVolume, duration) => {
    const audio = audioRef.current
    if (!audio) return
    clearInterval(fadeRef.current)
    audio.muted  = false
    audio.volume = 0

    const steps     = 40
    const interval  = duration / steps
    const increment = targetVolume / steps

    fadeRef.current = setInterval(() => {
      if (!audioRef.current) return clearInterval(fadeRef.current)
      const next = Math.min(audioRef.current.volume + increment, targetVolume)
      audioRef.current.volume = next
      if (next >= targetVolume) clearInterval(fadeRef.current)
    }, interval)
  }, [])

  // On first interaction — unmute and fade in
  useEffect(() => {
    if (started) return

    const unlock = () => {
      const audio = audioRef.current
      if (!audio) return

      if (audio.paused) audio.play().catch(() => {})

      setMuted(false)
      setStarted(true)
      fadeIn(volume, fadeInDuration)
    }

    window.addEventListener('click',      unlock, { once: true })
    window.addEventListener('touchstart', unlock, { once: true })
    window.addEventListener('keydown',    unlock, { once: true })

    return () => {
      window.removeEventListener('click',      unlock)
      window.removeEventListener('touchstart', unlock)
      window.removeEventListener('keydown',    unlock)
    }
  }, [started, fadeIn, volume, fadeInDuration])

  // Manual mute/unmute toggle
  const toggleMute = useCallback(() => {
    const audio = audioRef.current
    if (!audio) return

    if (!muted) {
      clearInterval(fadeRef.current)
      audio.volume = 0
      audio.muted  = true
      setMuted(true)
    } else {
      if (!started) setStarted(true)
      if (audio.paused) audio.play().catch(() => {})
      setMuted(false)
      fadeIn(volume, 800)
    }
  }, [muted, started, fadeIn, volume])

  return { muted, toggleMute, started }
}