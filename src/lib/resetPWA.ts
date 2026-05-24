export async function resetPWA() {
  // clear local storage
  localStorage.clear()
  sessionStorage.clear()

  // clear caches
  if ("caches" in window) {
    const keys = await caches.keys()
    await Promise.all(keys.map((k) => caches.delete(k)))
  }

  // unregister service workers
  if ("serviceWorker" in navigator) {
    const regs = await navigator.serviceWorker.getRegistrations()
    for (const reg of regs) {
      await reg.unregister()
    }
  }

  // reload
  window.location.reload()
}
