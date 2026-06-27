import { useEffect, useState } from "react"

const verses = [
  "✧ وَقُل رَّبِّ زِدْنِي عِلْمًا ✧",
  "✧ إِنَّ مَعَ الْعُسْرِ يُسْرًا ✧",
  "✧ فَاذْكُرُونِي أَذْكُرْكُمْ ✧",
  "✧ وَاللَّهُ خَيْرُ الرَّازِقِينَ ✧",
  "✧ رَّبِّ اشْرَحْ لِي صَدْرِي ✧",
]

export default function VerseTicker() {
  const [index, setIndex] = useState(0)
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false)

      setTimeout(() => {
        setIndex((prev) => (prev + 1) % verses.length)
        setVisible(true)
      }, 700)
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="mt-6 flex justify-center h-16 items-center">
      <p
        className={`
          font-amiri text-2xl
          text-primary/40
          transition-all duration-700 ease-in-out
          ${visible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2"}
        `}
      >
        {verses[index]}
      </p>
    </div>
  )
}
