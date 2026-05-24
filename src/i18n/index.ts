import i18n from "i18next"
import { initReactI18next } from "react-i18next"

import en from "./locales/en"
import fa from "./locales/fa"
import ar from "./locales/ar"
import az from "./locales/az"

export const RTL_LANGS = ["fa", "ar"]

i18n
    .use(initReactI18next)
    .init({
        resources: {
            en: { translation: en },
            fa: { translation: fa },
            ar: { translation: ar },
            az: { translation: az },
        },
        fallbackLng: "en",
        interpolation: {
            escapeValue: false,
        },
    })

export default i18n
