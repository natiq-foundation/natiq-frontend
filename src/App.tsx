import { ThemeProvider } from "@/components/ui/theme-provider"
import Router from "./router"

import InstallPrompt from "@/lib/InstallPrompt"
import IOSGuide from "@/routes/launcher/IOSGuide"
import OnlineStatus from "@/modules/OnlineStatus"


export default function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      <div className="min-h-screen bg-background text-foreground">

        <Router />

        {/* PWA install UI */}
        <IOSGuide />
        <InstallPrompt />
        <OnlineStatus />


      </div>
    </ThemeProvider>
  )
}
