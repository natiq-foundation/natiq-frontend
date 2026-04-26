import { useEffect, useState } from "react"

type Status = "online" | "offline" | "connecting"

export default function OnlineStatus() {
  const [status, setStatus] = useState<Status>("connecting")
  const [visible, setVisible] = useState(true)

  const colors: Record<Status, string> = {
    offline: "bg-red-500",
    connecting: "bg-gray-500",
    online: "bg-green-500",
  }

  const labels: Record<Status, string> = {
    offline: "Offline",
    connecting: "Connecting…",
    online: "Online",
  }

  async function checkConnection() {
    try {
      setStatus("connecting")

      if (!navigator.onLine) {
        setStatus("offline")
        return
      }

      const controller = new AbortController()
      const timeout = setTimeout(() => controller.abort(), 3000)

      await fetch("http://www.zoomit.ir", {
        method: "HEAD",
        mode: "no-cors",
        signal: controller.signal,
      })

      clearTimeout(timeout)

      setStatus("online")
      setVisible(true)
      setTimeout(() => setVisible(false), 1500)
    } catch {
      setStatus("offline")
      setVisible(true)
    }
  }

  useEffect(() => {
    checkConnection()

    const goOffline = () => {
      setStatus("offline")
      setVisible(true)
    }

    const goOnline = () => {
      checkConnection()
    }

    window.addEventListener("offline", goOffline)
    window.addEventListener("online", goOnline)

    return () => {
      window.removeEventListener("offline", goOffline)
      window.removeEventListener("online", goOnline)
    }
  }, [])

  if (!visible) return null

  return (
    <div
      className={`
        fixed top-0 left-0 w-full h-5 
        text-white text-xs
        flex items-center justify-center
        z-[9999]
        transition-all duration-300
        ${colors[status]}
      `}
    >
      {labels[status]}
    </div>
  )
}
