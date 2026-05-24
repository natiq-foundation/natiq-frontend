import {
  Globe,
  RotateCcw,
  ChevronLeft,
  Sun,
  Moon,
} from "lucide-react"

import { useState } from "react"
import { useSettings } from "@/context/settingsContext"
import { resetPWA } from "@/lib/resetPWA"
import { toggleTheme } from "@/lib/theme"

import { useTranslation } from "react-i18next"

import type { LangCodeType } from "@yakad/lib"

export function SettingsDropdown() {

  const { t } = useTranslation()

  const [showLangMenu, setShowLangMenu] = useState(false)

  const [settings, setSettings] = useSettings()

  const systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches

  const isDark =
    settings.themeMode === "dark" ||
    (settings.themeMode === "system" && systemDark)

  const changeLanguage = (code: LangCodeType) => {
    setSettings({
      ...settings,
      language: code,
    })

    setShowLangMenu(false)
  }

  const handleTheme = () => {
    toggleTheme(settings, setSettings)
  }

  const icon = isDark
    ? <Sun size={18} />
    : <Moon size={18} />

  const label = isDark
    ? t("common.lightMode")
    : t("common.darkMode")

  return (
    <>
      {!showLangMenu && (
        <>
          <button
            onClick={resetPWA}
            className="flex items-center gap-3 px-3 py-2 rounded-full text-sm hover:bg-surface-container-high text-red-500"
          >
            <RotateCcw size={18} />
            {t("common.resetApp")}
          </button>

          <button
            onClick={() => setShowLangMenu(true)}
            className="flex items-center gap-3 px-3 py-2 rounded-full text-sm hover:bg-surface-container-high"
          >
            <Globe size={18} />
            {t("common.language")}
          </button>

          <button
            onClick={handleTheme}
            className="flex items-center gap-3 px-3 py-2 rounded-full text-sm hover:bg-surface-container-high"
          >
            {icon}
            {label}
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
            {t("common.back")}
          </button>

          <button
            onClick={() => changeLanguage("en")}
            className={`px-3 py-2 rounded-full text-sm hover:bg-surface-container-high
            ${settings.language === "en" ? "text-primary font-semibold" : ""}`}
          >
            English
          </button>

          <button
            onClick={() => changeLanguage("ar")}
            className={`px-3 py-2 rounded-full text-sm hover:bg-surface-container-high
            ${settings.language === "ar" ? "text-primary font-semibold" : ""}`}
          >
            العربية
          </button>

          <button
            onClick={() => changeLanguage("fa")}
            className={`px-3 py-2 rounded-full text-sm hover:bg-surface-container-high
            ${settings.language === "fa" ? "text-primary font-semibold" : ""}`}
          >
            فارسی
          </button>

          <button
            onClick={() => changeLanguage("az")}
            className={`px-3 py-2 rounded-full text-sm hover:bg-surface-container-high
            ${settings.language === "az" ? "text-primary font-semibold" : ""}`}
          >
            Azərbaycan
          </button>
        </>
      )}
    </>
  )
}
