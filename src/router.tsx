import { BrowserRouter, Routes, Route } from "react-router-dom"
import Intro from "@/routes/intro"
import Launcher from "@/routes/launcher"
import IframePage from "@/routes/IframePage"

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Intro />} />
        <Route path="/launcher" element={<Launcher />} />
        <Route path="/iframe" element={<IframePage />} />
      </Routes>
    </BrowserRouter>
  )
}
