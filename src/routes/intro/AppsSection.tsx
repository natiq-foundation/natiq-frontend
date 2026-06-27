import { useTranslation } from "react-i18next"

import QuranIcon from "@/assets/icons/QuranIcon"
import ShareIcon from "@/assets/icons/ShareIcon"

export default function AppsSection() {

  const { t } = useTranslation()

  const sections = [
    {
      title: t("apps.quranTitle"),
      text1: t("apps.quranText1"),
      text2: t("apps.quranText2"),
      icon: <QuranIcon />,
    },
    {
      title: t("apps.shareTitle"),
      text1: t("apps.shareText1"),
      text2: t("apps.shareText2"),
      icon: <ShareIcon />,
    },
  ]

  return (
    <section className="my-32 px-6 flex justify-center">
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
