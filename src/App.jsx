import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import { CATEGORY_KEYS } from './constants'
import { useNote } from './features/notes/useNote'
import { useAudio } from './features/audio/useAudio'
import WallBackground from './components/WallBackground'
import Header from './components/Header'
import CategoryNav from './components/CategoryNav'
import NoteCard from './components/NoteCard'
import { DrawButton } from './components/ui'
import Footer from './components/Footer'
import MusicToggle from './components/MusicToggle'
import WelcomeModal from './components/WelcomeModal'

/**
 * App is a pure layout shell.
 * All state logic lives in useNote.
 * All visual identity lives in CATEGORIES.
 */
export default function App() {
  const { category, note, selectCategory, drawAnother } = useNote()
  const { muted, toggleMute, started } = useAudio('/audio/bg-music.mp3', { volume: 0.4 })
  const [showModal, setShowModal] = useState(true)

  const handleEnter = () => {
    setShowModal(false)
    // The click on the modal button counts as a user interaction,
    // so useAudio's unlock listener fires automatically.
  }

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden select-none">
      
      <WallBackground category={category} />

      <div className="relative z-10 flex flex-col items-center w-full max-w-2xl px-6 py-12 gap-10">
        <Header />

        <CategoryNav
          categories={CATEGORY_KEYS}
          active={category}
          onSelect={selectCategory}
        />

        <main className="w-full flex flex-col items-center gap-8">
          <AnimatePresence mode="wait">
            <NoteCard key={note} text={note} category={category} />
          </AnimatePresence>

          <DrawButton onClick={drawAnother} />
        </main>
        <Footer githubUrl="https://github.com/jodyuan" name="jodyuan" />
      </div>
      <MusicToggle muted={muted} onToggle={toggleMute} started={started} />
      <WelcomeModal visible={showModal} onEnter={handleEnter} />
    </div>
  )
}