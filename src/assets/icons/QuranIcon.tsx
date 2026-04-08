export default function QuranIcon() {
  return (
    <svg
      viewBox="0 0 200 200"
      className="w-56 h-56 text-primary/80"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {/* left page */}
      <path d="M25 70 Q65 50 100 70 V150 Q65 130 25 150 Z" />

      {/* right page */}
      <path d="M175 70 Q135 50 100 70 V150 Q135 130 175 150 Z" />

      {/* spine */}
      <line x1="100" y1="70" x2="100" y2="150" />

      {/* page lines */}
      <line x1="40" y1="95" x2="85" y2="90" />
      <line x1="40" y1="110" x2="85" y2="105" />
      <line x1="115" y1="90" x2="160" y2="95" />
      <line x1="115" y1="105" x2="160" y2="110" />
    </svg>
  )
}
