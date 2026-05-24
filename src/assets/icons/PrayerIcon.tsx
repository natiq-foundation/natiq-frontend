export default function PrayerIcon() {
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
      {/* mihrab */}
      <path d="M60 150 V90 Q100 40 140 90 V150" />

      {/* head */}
      <circle cx="100" cy="110" r="8" />

      {/* body in sujood */}
      <path d="M90 118 Q100 130 110 118" />
      <line x1="80" y1="135" x2="120" y2="135" />
    </svg>
  )
}
