import { openApp } from "@/lib/appLink"
import VerseTicker from "./RandomVerse"

export function IntroSection() {
  return (
    <section className="px-6 pt-32 flex justify-center">
      <div
        className="
        max-w-6xl w-full
        rounded-[28px]
        bg-surface-container
        elevation-2
        p-12
        flex flex-col md:flex-row
        items-center
        gap-16
      "
      >
        {/* text side */}
        <div className="flex-1 flex flex-col items-center text-center gap-6">
          <h1 className="font-[Amiri] text-5xl leading-tight">
            الْقُرآنُ <span className="text-primary">النّاطِق</span>
          </h1>

          <p className="text-muted-foreground text-lg">
            Natiq Quran
          </p>

          <VerseTicker />
          <button
           onClick={() => openApp("quran")}
  className="
  mt-4
  px-8 py-3
  rounded-full
  bg-primary
  text-white
  text-sm
  font-medium
  tracking-wide
  shadow-md
  hover:shadow-lg
  hover:brightness-110
  active:scale-[0.98]
  transition
  "
>
  Start Now
</button>
        </div>

        {/* logo */}
        <div className="flex-1 flex justify-center">
          <div
            className="
            w-48 h-48
            flex items-center justify-center
            rounded-full
            bg-primary/10
          "
          >
            <img
              src="/logoicon.svg"
              className="w-32 h-32"
              alt="logo"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
