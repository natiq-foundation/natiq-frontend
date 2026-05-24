import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"
import "./style.css"
import { registerSW } from "virtual:pwa-register"
import "./i18n"


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
