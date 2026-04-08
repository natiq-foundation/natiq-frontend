export function isStandaloneDisplayMode() {
  return window.matchMedia("(display-mode: standalone)").matches
}

export function isIOSStandalone() {
  return (window.navigator as any).standalone === true
}

export function isAndroidTWAReferrer() {
  return document.referrer?.startsWith("android-app://")
}

export function isPWA() {
  if (typeof window === "undefined") return false
  return isStandaloneDisplayMode() || isIOSStandalone() || isAndroidTWAReferrer()
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
