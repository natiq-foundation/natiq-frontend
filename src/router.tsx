import { BrowserRouter, Routes, Route, useLocation, useNavigate } from "react-router-dom"
import { useEffect } from "react"

import Intro from "@/routes/intro"
import Launcher from "@/routes/launcher"
import IframePage from "@/routes/IframePage"

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
        <Route path="/" element={<Intro />} />
        <Route path="/launcher" element={<Launcher />} />
        <Route path="/iframe" element={<IframePage />} />
      </Routes>
    </BrowserRouter>
  )
}
