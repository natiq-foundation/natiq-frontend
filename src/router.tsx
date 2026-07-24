import { BrowserRouter, Routes, Route, Navigate, useLocation, useNavigate } from "react-router-dom"
import { useEffect } from "react"
import LauncherLayout from "@/layouts/LauncherLayout"
import LauncherApps from "@/routes/launcher/apps/apps"
import LauncherSettings from "@/routes/launcher/settings/settings"
import IframePage from "@/routes/IframePage"
import IntroPage from "./routes/intro"

function PWARedirect() {
  const location = useLocation()
  const navigate = useNavigate()
  useEffect(() => {
    const params = new URLSearchParams(location.search)
    if (params.get("src") === "pwa_install") {
      navigate("/launcher", { replace: true })
    }
  }, [location, navigate])
  return null
}

export default function Router() {
  return (
    <BrowserRouter>
      <PWARedirect />
      <Routes>
        <Route >
          <Route path="/" element={<IntroPage />} />
        </Route>

        <Route path="/launcher" element={<LauncherLayout />}>
          <Route index element={<Navigate to="apps" replace />} />
          <Route path="apps" element={<LauncherApps />} />
          <Route path="settings" element={<LauncherSettings />} />
        </Route>

        <Route path="/iframe" element={<IframePage />} />
      </Routes>
    </BrowserRouter>
  )
}