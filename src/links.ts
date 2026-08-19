import { getRequiredEnvVar } from "@/lib/env";

const BASE_DOMAIN = getRequiredEnvVar("VITE_BASE_DOMAIN", "natiq.org");

export const links = {
    quran: `https://quran.${BASE_DOMAIN}`,
    blog: "https://blog.natiq.org",
    sponsor: "https://sponsor.natiq.org",
    dev: "https://dev.natiq.org",
    privacyPolicy: "https://blog.natiq.org/privacy-policy/",
} as const;