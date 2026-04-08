import { Globe, Moon, Sun, Settings, RotateCcw } from "lucide-react"
import { resetPWA } from "@/lib/resetPWA"
import { useState, useEffect } from "react"

type Props = {
  open: boolean
  toggle: () => void
}

export function SettingsDropdown({ open, toggle }: Props) {
  const [dark, setDark] = useState(false)

  useEffect(() => {
    setDark(document.documentElement.classList.contains("dark"))
  }, [])

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

  return (
    <div className="relative">
      <button
        onClick={toggle}
        className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-surface-container-high transition"
      >
        <Settings size={20} />
      </button>

      {open && (
        <div
          className="
          absolute right-0 mt-3
          w-48 p-2
          rounded-3xl
          bg-surface-container-high
          elevation-3
          flex flex-col gap-1
        "
        >

          <button
            onClick={resetPWA}
            className="flex items-center gap-3 px-3 py-2 rounded-full hover:bg-surface-container-highest text-sm text-red-500"
          >
            <RotateCcw size={18} />
            Reset App
          </button>

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
      )}
    </div>
  )
}
