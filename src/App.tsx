import { ThemeProvider } from "@/components/ui/theme-provider"
import Router from "./router"

import InstallPrompt from "@/lib/InstallPrompt"
import IOSGuide from "@/routes/launcher/IOSGuide"
import OnlineStatus from "@/modules/OnlineStatus"

import { LanguageSync } from "./hooks/languageSync"

import {
  SettingsProvider,
} from "./context/settingsContext"

export default function App() {
  return (
    <SettingsProvider>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <LanguageSync />

        <div className="bg-background text-foreground">
          <Router />

          {/* PWA prompts */}
          <IOSGuide />
          <InstallPrompt />

          {/* Network bar */}
          <OnlineStatus />
        </div>
      </ThemeProvider>
    </SettingsProvider>
  )
}
