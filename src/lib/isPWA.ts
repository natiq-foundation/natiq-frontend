export function isStandaloneDisplayMode() {
  return window.matchMedia("(display-mode: standalone)").matches
}

export function isIOSStandalone() {
  return "standalone" in window.navigator && (window.navigator as any).standalone === true
}

export function isAndroidTWAReferrer() {
  return document.referrer.includes("android-app://")
}

export function isPWA() {
  if (typeof window === "undefined") return false

  return (
    isStandaloneDisplayMode() ||
    isIOSStandalone() ||
    isAndroidTWAReferrer()
  )
}

export function pwaInstallPopupEnabled() {
  return import.meta.env.VITE_ENABLE_PWA_INSTALL_POPUP === "true"
}

export const isIOS = () =>
  /iphone|ipad|ipod/i.test(navigator.userAgent)

export const isAndroid = () =>
  /android/i.test(navigator.userAgent)

export const isSafari = () =>
  /^((?!chrome|android).)*safari/i.test(navigator.userAgent)
