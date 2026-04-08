import {AppBar} from "./AppBar"
import {IntroSection} from "./IntroSection"
import AppsSection from "@/assets/icons/AppsSection"
import Footer from "./Footer"

export default function IntroPage() {
  return (
    <main className="min-h-screen bg-background">

      <AppBar />
      <IntroSection />
      <AppsSection />
      <Footer/>

    </main>
  )
}
