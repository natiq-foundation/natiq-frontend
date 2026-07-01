import { useState } from "react"
import { Material } from "@yakad/symbols"

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

  const themeIcon = isDark ? "light_mode" : "dark_mode"
  const label = isDark
    ? t("common.lightMode")
    : t("common.darkMode")

  return (
    <div className="flex flex-col">
      {!showLangMenu && (
        <>
          <button
            onClick={resetPWA}
            className="w-full  flex items-center gap-3 px-3 py-2 rounded-full text-sm hover:bg-surface-container-high text-red-500"
          >
            <Material icon="restart_alt" size={24} />
            {t("common.resetApp")}
          </button>

          <button
            onClick={() => setShowLangMenu(true)}
            className="w-full  flex items-center gap-3 px-3 py-2 rounded-full text-sm hover:bg-surface-container-high"
          >
            <Material icon="language" size={24} />
            {t("common.language")}
          </button>

          <button
            onClick={handleTheme}
            className="w-full  flex items-center gap-3 px-3 py-2 rounded-full text-sm hover:bg-surface-container-high"
          >
            <Material icon={themeIcon} size={24} />
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
            <Material icon="arrow_back" size={24} />
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
    </div>
  )
}
