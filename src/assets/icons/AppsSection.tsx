import QuranIcon from "@/assets/icons/QuranIcon"
import PrayerIcon from "@/assets/icons/PrayerIcon"
import ShareIcon from "@/assets/icons/ShareIcon"

export default function NextSection() {
  return (
    <section className="mt-32 px-6 flex justify-center">
      <div className="max-w-6xl w-full space-y-32">
  
        {/* Quran */}
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl font-semibold text-foreground">
              The Quran Experience
            </h2>

            <p className="mt-4 text-muted-foreground leading-relaxed">
              Our Quran application brings the sacred text into a modern,
              beautifully designed experience. Explore the Quran with
              multiple languages, authentic translations, and various
              Mushaf styles.
            </p>

            <p className="mt-4 text-muted-foreground leading-relaxed">
              Navigate verses effortlessly, discover meanings, and connect
              with the message of the Quran through a clean and intuitive
              interface designed for deep reflection.
            </p>
          </div>

          <div className="flex justify-center">
            <QuranIcon />
          </div>
        </div>

        {/* Prayer */}
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div className="flex justify-center md:order-1 order-2">
            <PrayerIcon />
          </div>

          <div className="md:order-2 order-1">
            <h2 className="text-3xl font-semibold text-foreground">
              Learn and Improve Your Prayer
            </h2>

            <p className="mt-4 text-muted-foreground leading-relaxed">
              The app guides you step by step in learning the prayer.
              From beginners who want to learn the basics to those who
              want to perfect their recitation and movements.
            </p>

            <p className="mt-4 text-muted-foreground leading-relaxed">
              Clear explanations, structured guidance, and simple tools
              help make learning prayer natural and accessible for
              everyone.
            </p>
          </div>
        </div>

        {/* Sharing */}
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl font-semibold text-foreground">
              Share Knowledge
            </h2>

            <p className="mt-4 text-muted-foreground leading-relaxed">
              Knowledge grows when it is shared. Our platform allows you
              to easily share verses, insights, and reflections with
              others.
            </p>

            <p className="mt-4 text-muted-foreground leading-relaxed">
              Spread beneficial knowledge, inspire others, and become
              part of a community that helps keep the message of the
              Quran alive.
            </p>
          </div>

          <div className="flex justify-center">
            <ShareIcon />
          </div>
        </div>

      </div>
    </section>
  )
}
