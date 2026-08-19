import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"
import "./style.css"
import { registerSW } from "virtual:pwa-register"
import "./i18n"
import { ErrorBoundary } from "./components/modules/errors/ErrorBoundary"
import { validateRequiredEnv } from "./lib/env"

document.addEventListener("wheel", (e) => {
  if (e.ctrlKey) e.preventDefault()
}, { passive: false })

document.addEventListener("touchmove", (e) => {
  if (e.touches.length > 1) e.preventDefault()
}, { passive: false })

let lastTouchEnd = 0
document.addEventListener("touchend", (e) => {
  const now = Date.now()
  if (now - lastTouchEnd <= 300) e.preventDefault()
  lastTouchEnd = now
}, { passive: false })

validateRequiredEnv()

const rootElement = document.getElementById("root")!

try {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    </React.StrictMode>
  )
} catch (error) {
  console.error("[main] Fatal error while mounting the app:", error)
  rootElement.innerHTML = `
    <div style="display:flex;flex-direction:column;align-items:center;justify-content:center;height:100vh;font-family:sans-serif;text-align:center;padding:24px;">
      <h1>Something went wrong</h1>
      <p style="color:#666;max-width:420px;">
        The app failed to start due to a configuration error. Check the browser console for details.
      </p>
    </div>
  `
}

try {
  registerSW({
    onNeedRefresh() {
      console.log("New content available, refresh needed.")
    },
    onOfflineReady() {
      console.log("App ready to work offline")
    },
  })
} catch (error) {
  console.error("[main] Failed to register service worker:", error)
}