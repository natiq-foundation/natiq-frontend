const BASE_DOMAIN = import.meta.env.VITE_BASE_DOMAIN

export const links = {
    quran: `https://quran.${BASE_DOMAIN}`,
    blog: "https://natiq.org",
    sponsor: "https://sponsor.natiq.org",
    dev: "https://dev.natiq.org",
    privacyPolicy: "https://natiq.org/privacy-policy/",
} as const