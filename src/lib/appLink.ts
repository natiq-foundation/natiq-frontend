import { isPWA } from "./isPWA"

const apps = {
  quran: import.meta.env.VITE_APP_QURAN,
  blog: import.meta.env.VITE_APP_BLOG,
  sponsor: import.meta.env.VITE_APP_SPONSOR,
  dev: import.meta.env.VITE_APP_DEV,
} as const

export function openApp(app: keyof typeof apps) {
  const url = apps[app]

  if (!url) return

  if (isPWA()) {
    window.location.href = `/iframe?src=${url}`
  } else {
    window.open(url, "_blank")
  }
}
