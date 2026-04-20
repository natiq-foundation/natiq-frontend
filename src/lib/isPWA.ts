export function pwaEnabled() {
  return import.meta.env.VITE_ENABLE_PWA === "true"
}

export function isStandaloneDisplayMode() {
  if (!pwaEnabled()) return false
  return window.matchMedia("(display-mode: standalone)").matches
}

export function isIOSStandalone() {
  if (!pwaEnabled()) return false
  return (window.navigator as any).standalone === true
}

export function isAndroidTWAReferrer() {
  if (!pwaEnabled()) return false
  return document.referrer?.startsWith("android-app://")
}

export function isPWA() {
  if (typeof window === "undefined") return false
  if (!pwaEnabled()) return false

  return (
    isStandaloneDisplayMode() ||
    isIOSStandalone() ||
    isAndroidTWAReferrer()
  )
}

export function isIOS() {
  if (typeof window === "undefined") return false
  return /iphone|ipad|ipod/i.test(window.navigator.userAgent)
}

export function isAndroid() {
  if (typeof window === "undefined") return false
  return /android/i.test(window.navigator.userAgent)
}

export function isSafari() {
  if (typeof window === "undefined") return false
  const ua = window.navigator.userAgent
  const isSafari = /^((?!chrome|android).)*safari/i.test(ua)
  return isSafari
}
