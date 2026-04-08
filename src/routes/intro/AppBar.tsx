import { useState, useEffect } from "react"
import {
  Menu,
  Newspaper,
  Heart,
  Wrench,
  X,
  Grid3X3,
  Globe,
  Moon,
  Sun,
  Settings
} from "lucide-react"

import { DropdownButton } from "./DropdownButton"
import AppsList from "@/modules/AppCardGrid"

type Props = {
  hideApps?: boolean
}

export function AppBar({ hideApps }: Props) {
  const [drawerOpen, setDrawerOpen] = useState(false)

  const [appsOpen, setAppsOpen] = useState(false)
  const [settingsOpen, setSettingsOpen] = useState(false)

  const dark = document.documentElement.classList.contains("dark")

  const toggleDark = () => {
    const root = document.documentElement
    dark ? root.classList.remove("dark") : root.classList.add("dark")
  }

  const items = [
    { icon: <Newspaper size={20} />, label: "Blog" },
    { icon: <Heart size={20} />, label: "Sponsor" },
    { icon: <Wrench size={20} />, label: "Dev Tools" }
  ]

  useEffect(() => {
    const handleScroll = () => {
      setAppsOpen(false)
      setSettingsOpen(false)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const toggleApps = () => {
    setAppsOpen(!appsOpen)
    setSettingsOpen(false)
  }

  const toggleSettings = () => {
    setSettingsOpen(!settingsOpen)
    setAppsOpen(false)
  }

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 pt-4">
        <div
          className="
          w-full max-w-6xl
          h-16
          px-4
          flex items-center justify-between
          rounded-2xl
          bg-surface
          elevation-2
          "
        >
          {/* LEFT */}
          <div className="flex items-center">
            <button
              onClick={() => setDrawerOpen(true)}
              className="p-2 rounded-full hover:bg-surface-container-high transition"
            >
              <Menu size={22} />
            </button>

            <span className="ml-3 font-medium text-sm tracking-wide">
              Natiq
            </span>
          </div>

          {/* RIGHT */}
          <div className="flex items-center gap-1">
            {!hideApps && (
              <DropdownButton
                open={appsOpen}
                toggle={toggleApps}
                icon={<Grid3X3 size={22} />}
                width="w-64"
              >
                <AppsList small />
              </DropdownButton>
            )}

            <DropdownButton
              open={settingsOpen}
              toggle={toggleSettings}
              icon={<Settings size={20} />}
            >
              <div className="flex flex-col gap-1">
                <button className="flex items-center gap-3 px-3 py-2 rounded-full hover:bg-surface-container-highest text-sm">
                  <Globe size={18} />
                  Language
                </button>

                <button
                  onClick={toggleDark}
                  className="flex items-center gap-3 px-3 py-2 rounded-full hover:bg-surface-container-highest text-sm"
                >
                  {dark ? <Sun size={18} /> : <Moon size={18} />}
                  Dark Mode
                </button>
              </div>
            </DropdownButton>
          </div>
        </div>
      </header>

      {/* BACKDROP */}
      {drawerOpen && (
        <div
          onClick={() => setDrawerOpen(false)}
          className="fixed inset-0 bg-black/20 z-40"
        />
      )}

      {/* DRAWER */}
      <aside
        className={`
        fixed top-0 left-0 h-full w-[280px]
        bg-surface-container
        rounded-r-3xl
        elevation-3
        z-50
        p-6
        transition-transform duration-300
        ${drawerOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <div className="flex items-center justify-between mb-6">
          <span className="font-medium text-lg">Menu</span>

          <button
            onClick={() => setDrawerOpen(false)}
            className="p-2 rounded-full hover:bg-surface-container-high"
          >
            <X size={20} />
          </button>
        </div>

        <nav className="flex flex-col gap-2">
          {items.map((item) => (
            <button
              key={item.label}
              className="
              flex items-center gap-4
              px-4 py-3
              rounded-full
              hover:bg-surface-container-high
              transition
              "
            >
              {item.icon}
              <span className="text-sm">{item.label}</span>
            </button>
          ))}
        </nav>
      </aside>
    </>
  )
}
