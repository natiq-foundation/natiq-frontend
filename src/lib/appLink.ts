import { isPWA } from "./isPWA"



const base = import.meta.env.VITE_BASE_DOMAIN

export function openApp(subdomain: string) {
  const url = `https://${subdomain}.${base}`

  if (isPWA()) {
    window.location.href = `/iframe?src=${url}`
  } else {
    window.open(url, "_blank")
  }
}

