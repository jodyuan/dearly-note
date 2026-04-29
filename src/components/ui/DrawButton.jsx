/**
 * The "draw another note" action trigger.
 * Kept separate so App.jsx stays clean and this can be reskinned independently.
 */
export default function DrawButton({ onClick }) {
    return (
        <button
            onClick={onClick}
            className="group flex items-center gap-3 font-sans text-sm italic text-stone-400 hover:text-stone-700 transition-all duration-300"
        >
            <span>draw another note</span>
        </button>
    )
}