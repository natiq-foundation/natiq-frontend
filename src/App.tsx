import { ThemeProvider } from "@/components/ui/theme-provider"
import Router from "./router"

import InstallPrompt from "@/lib/InstallPrompt"
import IOSGuide from "@/routes/launcher/IOSGuide"
import OnlineStatus from "@/modules/OnlineStatus"

import { SettingsProvider } from "./context/settingsContext"
import { PWAInstallProvider } from "./context/PWAInstallContext"

export default function App() {
  return (
    <SettingsProvider>
      <PWAInstallProvider>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <div className="bg-background text-foreground">
            <Router />

            <IOSGuide />
            <InstallPrompt />
            <OnlineStatus />
          </div>
        </ThemeProvider>
      </PWAInstallProvider>
    </SettingsProvider>
  )
}
