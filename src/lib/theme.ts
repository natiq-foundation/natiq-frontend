import type { Settings } from "@/context/settingsContext"

export function applyTheme(mode: Settings["themeMode"]) {
    const root = document.documentElement

    const set = (dark: boolean) => {
        if (dark) root.classList.add("dark")
        else root.classList.remove("dark")
    }

    if (mode === "dark") {
        set(true)
        return
    }

    if (mode === "light") {
        set(false)
        return
    }

    const mq = window.matchMedia("(prefers-color-scheme: dark)")
    set(mq.matches)
}

export function toggleTheme(
    settings: Settings,
    setSettings: (s: Settings) => void
) {
    let next: "light" | "dark"

    if (settings.themeMode === "system") {
        const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches
        next = isDark ? "light" : "dark"
    } else {
        next = settings.themeMode === "dark" ? "light" : "dark"
    }

    const nextSettings = {
        ...settings,
        themeMode: next,
    }

    setSettings(nextSettings)
    applyTheme(next)
}
