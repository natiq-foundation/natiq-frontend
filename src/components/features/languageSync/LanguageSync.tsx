import { useEffect } from "react"
import i18n, { RTL_LANGS } from "@/i18n"
import { useSettings } from "@/context/settingsContext"

export function LanguageSync() {
    const [settings] = useSettings()

    useEffect(() => {
        const lang = settings.language

        i18n.changeLanguage(lang)

        document.documentElement.lang = lang
        document.documentElement.dir =
            RTL_LANGS.includes(lang) ? "rtl" : "ltr"

    }, [settings.language])

    return null
}
