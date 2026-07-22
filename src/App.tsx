import { ThemeProvider } from "@/components/ui/theme-provider"
import Router from "./router"

import InstallPrompt from "@/components/features/installPrompt/InstallPrompt"
import IOSGuide from "@/routes/launcher/IOSGuide"

import { LanguageSync } from "@/components/features//languageSync/LanguageSync"

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
        </div>
      </ThemeProvider>
    </SettingsProvider>
  )
}