import {
  Globe,
  Moon,
  Sun,
  RotateCcw,
  ChevronLeft,
} from "lucide-react"
import { useState } from "react"
import { useSettings } from "@/context/settingsContext"
import { resetPWA } from "@/lib/resetPWA"

type Props = {
  dark: boolean
  onToggleDark: () => void
}

export function SettingsDropdown({ dark, onToggleDark }: Props) {
  const [showLangMenu, setShowLangMenu] = useState(false)
  const [settings, setSettings] = useSettings()

  const changeLanguage = (code: string) => {
    setSettings({ ...settings, language: code as any })
    setShowLangMenu(false)
  }

  return (
    <>
      {!showLangMenu && (
        <>
          <button
            onClick={resetPWA}
            className="flex items-center gap-3 px-3 py-2 rounded-full text-sm hover:bg-surface-container-high text-red-500"
          >
            <RotateCcw size={18} />
            Reset App
          </button>

          <button
            onClick={() => setShowLangMenu(true)}
            className="flex items-center gap-3 px-3 py-2 rounded-full text-sm hover:bg-surface-container-high"
          >
            <Globe size={18} />
            Language
          </button>

          <button
            onClick={onToggleDark}
            className="flex items-center gap-3 px-3 py-2 rounded-full text-sm hover:bg-surface-container-high"
          >
            {dark ? <Sun size={18} /> : <Moon size={18} />}
            {dark ? "Light Mode" : "Dark Mode"}
          </button>
        </>
      )}

      {showLangMenu && (
        <>
          <button
            onClick={() => setShowLangMenu(false)}
            className="flex items-center gap-2 px-3 py-2 rounded-full text-sm hover:bg-surface-container-high"
          >
            <ChevronLeft size={18} />
            Back
          </button>

          <button
            onClick={() => changeLanguage("en")}
            className={`
              px-3 py-2 rounded-full text-sm hover:bg-surface-container-high
              ${settings.language === "en" ? "text-primary font-semibold" : ""}
            `}
          >
            English
          </button>

          <button
            onClick={() => changeLanguage("ar")}
            className={`
              px-3 py-2 rounded-full text-sm hover:bg-surface-container-high
              ${settings.language === "ar" ? "text-primary font-semibold" : ""}
            `}
          >
            العربية
          </button>

          <button
            onClick={() => changeLanguage("fa")}
            className={`
              px-3 py-2 rounded-full text-sm hover:bg-surface-container-high
              ${settings.language === "fa" ? "text-primary font-semibold" : ""}
            `}
          >
            فارسی
          </button>
        </>
      )}
    </>
  )
}
