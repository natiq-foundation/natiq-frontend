import { AppBar } from "./AppBar"
import { IntroSection } from "./IntroSection"
import AppsSection from "@/routes/intro/AppsSection"
import Footer from "./Footer"

export default function IntroPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">

      <AppBar />

      <div className="flex-1">
        <IntroSection />
        <AppsSection />
      </div>

      <Footer />

    </div>
  )
}
