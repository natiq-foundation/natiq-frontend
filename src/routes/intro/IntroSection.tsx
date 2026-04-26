import { openApp } from "@/lib/appLink"
import VerseTicker from "./RandomVerse"
import LogoIcon from "/public/logoicon.svg?react"
import { useTranslation } from "react-i18next"
import { Button } from "@/components/ui/button"

export function IntroSection() {

  const { t } = useTranslation()

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
            <LogoIcon className="w-40 h-40 text-foreground" />
          </div>
        </div>

        {/* text side */}
        <div className="flex-1 flex flex-col items-center text-center gap-6">
          <h1 className="font-[Amiri] text-5xl leading-tight">
            الْقُرآنُ <span className="text-primary">النّاطِق</span>
          </h1>

          <p className="text-muted-foreground text-lg">
            Natiq Quran
          </p>

          <VerseTicker />

          <Button
            onClick={() => openApp("quran")}
          >
            {t("intro.openApp")}
          </Button>
        </div>

      </div>
    </section>
  )
}
