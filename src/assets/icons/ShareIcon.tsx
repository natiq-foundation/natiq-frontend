export default function ShareIcon() {
  return (
    <svg
      viewBox="0 0 200 200"
      className="w-52 h-52 text-primary/70"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {/* quran */}
      <rect x="70" y="80" width="60" height="40" rx="6" />

      {/* signal waves */}
      <path d="M140 100 Q160 100 170 80" />
      <path d="M140 100 Q160 100 170 120" />

      {/* dots */}
      <circle cx="170" cy="80" r="4" fill="currentColor" stroke="none" />
      <circle cx="170" cy="120" r="4" fill="currentColor" stroke="none" />
    </svg>
  )
}
    