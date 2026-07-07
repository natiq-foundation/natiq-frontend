import { isPWA } from "./isPWA"
import { links } from "@/links"

const apps = {
  quran: links.quran,
  blog: links.blog,
  sponsor: links.sponsor,
  dev: links.dev,
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