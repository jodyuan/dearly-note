export default function Footer({ githubUrl = 'https://github.com/jodyuan', name = 'jodyuan' }) {
  return (
    <footer className="flex items-center gap-2 font-serif italic text-xs text-stone-600/60">
      <span>made by</span>
      <a
        href={githubUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="text-stone-500/60 hover:text-stone-600 transition-colors duration-300 underline underline-offset-2 decoration-stone-300/50"
      >
        {name}
      </a>
    </footer>
  )
}