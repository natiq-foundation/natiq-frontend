import { useState, useEffect } from "react"
import {
  Menu,
  Grid3X3,
  Settings as SettingsIcon,
} from "lucide-react"

import { DropdownButton } from "./DropdownButton"
import AppsList from "@/modules/AppCardGrid"
import { SideDrawer } from "./SideDrawer"
import { SettingsDropdown } from "./SettingsDropdown"

type Props = { hideApps?: boolean }

export function AppBar({ hideApps }: Props) {
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [appsOpen, setAppsOpen] = useState(false)
  const [settingsOpen, setSettingsOpen] = useState(false)

  const [dark, setDark] = useState(() =>
    document.documentElement.classList.contains("dark")
  )

  const toggleDark = () => {
    const root = document.documentElement
    if (root.classList.contains("dark")) {
      root.classList.remove("dark")
      setDark(false)
    } else {
      root.classList.add("dark")
      setDark(true)
    }
  }

  // Close dropdowns on scroll
  useEffect(() => {
    const closeOnScroll = () => {
      setAppsOpen(false)
      setSettingsOpen(false)
    }
    window.addEventListener("scroll", closeOnScroll)
    return () => window.removeEventListener("scroll", closeOnScroll)
  }, [])

  // Close dropdowns when drawer opens
  useEffect(() => {
    if (drawerOpen) {
      setAppsOpen(false)
      setSettingsOpen(false)
    }
  }, [drawerOpen])

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-30 flex justify-center px-4 pt-4">

        {/* تغییر اصلی اینجاست */}
        <div className="w-full max-w-6xl h-16 px-4 flex items-center justify-between rounded-2xl bg-surface-container elevation-3">

          {/* Left */}
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

          {/* Right */}
          <div className="flex items-center gap-1">

            {/* Apps Dropdown */}
            {!hideApps && (
              <DropdownButton
                open={appsOpen}
                toggle={() => {
                  setAppsOpen(!appsOpen)
                  setSettingsOpen(false)
                }}
                close={() => setAppsOpen(false)}
                icon={<Grid3X3 size={22} />}
                width="w-64"
              >
                <AppsList small />
              </DropdownButton>
            )}

            {/* Settings Dropdown */}
            <div className="relative">
              <DropdownButton
                open={settingsOpen}
                toggle={() => {
                  setSettingsOpen(!settingsOpen)
                  setAppsOpen(false)
                }}
                close={() => setSettingsOpen(false)}
                icon={<SettingsIcon size={22} />}
                width="w-60"
              >
                <SettingsDropdown
                  dark={dark}
                  onToggleDark={toggleDark}
                />
              </DropdownButton>
            </div>

          </div>
        </div>
      </header>

      <SideDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      />
    </>
  )
}
