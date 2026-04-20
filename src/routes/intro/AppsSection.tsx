import QuranIcon from "@/assets/icons/QuranIcon"
import ShareIcon from "@/assets/icons/ShareIcon"

const sections = [
  {
    title: "The Quran Experience",
    text1:
      "Our Quran application brings the sacred text into a modern, beautifully designed experience. Explore the Quran with multiple languages, authentic translations, and various Mushaf styles.",
    text2:
      "Navigate verses effortlessly, discover meanings, and connect with the message of the Quran through a clean and intuitive interface designed for deep reflection.",
    icon: <QuranIcon />,
  },
  {
    title: "Share Knowledge",
    text1:
      "Knowledge grows when it is shared. Our platform allows you to easily share verses, insights, and reflections with others.",
    text2:
      "Spread beneficial knowledge, inspire others, and become part of a community that helps keep the message of the Quran alive.",
    icon: <ShareIcon />,
  },
]

export default function NextSection() {
  return (
    <section className="mt-32 px-6 flex justify-center">
      <div className="max-w-6xl w-full space-y-32">
        {sections.map((section, i) => (
          <div
            key={i}
            className={`flex flex-col md:flex-row items-center gap-16 ${i % 2 === 1 ? "md:flex-row-reverse" : ""
              }`}
          >
            <div className="flex-1">
              <h2 className="text-3xl font-semibold text-foreground">
                {section.title}
              </h2>

              <p className="mt-4 text-muted-foreground leading-relaxed">
                {section.text1}
              </p>

              <p className="mt-4 text-muted-foreground leading-relaxed">
                {section.text2}
              </p>
            </div>

            <div className="flex-1 flex justify-center">
              {section.icon}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
