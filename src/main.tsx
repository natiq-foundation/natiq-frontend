import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"
import "./style.css"
import { registerSW } from "virtual:pwa-register"
import "./i18n"


document.addEventListener("wheel", (e) => {
  if (e.ctrlKey) e.preventDefault()
}, { passive: false })

// Prevent pinch-zoom on mobile
document.addEventListener("touchmove", (e) => {
  if (e.touches.length > 1) e.preventDefault()
}, { passive: false })

// Prevent double-tap zoom
let lastTouchEnd = 0
document.addEventListener("touchend", (e) => {
  const now = Date.now()
  if (now - lastTouchEnd <= 300) e.preventDefault()
  lastTouchEnd = now
}, { passive: false })

ReactDOM.createRoot(document.getElementById("root")!).render(

  <React.StrictMode>
    <App />
  </React.StrictMode>
)

// register service worker
registerSW({
  onNeedRefresh() {
    console.log("New content available, refresh needed.")
  },
  onOfflineReady() {
    console.log("App ready to work offline")
  },

})
