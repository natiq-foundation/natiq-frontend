import { useEffect, useRef, useState } from "react"

type Status = "online" | "offline" | "connecting" | "disconnected"

type Props = {
  onVisibleChange?: (visible: boolean) => void
}

const apiUrls = (import.meta.env.VITE_API_URLS as string)
  .split(",")
  .map((url: string) => url.trim())

export default function OnlineStatus({ onVisibleChange }: Props) {
  const [status, setStatus] = useState<Status>("connecting")
  const [visible, setVisible] = useState(false)

  const firstCheck = useRef(true)

  const colors: Record<Status, string> = {
    offline: "bg-red-500",
    disconnected: "bg-orange-500",
    connecting: "bg-gray-500",
    online: "bg-green-500",
  }

  const labels: Record<Status, string> = {
    offline: "You're offline",
    disconnected: "Can't Connect to Server",
    connecting: "Connecting…",
    online: "Online",
  }

  useEffect(() => {
    onVisibleChange?.(visible)
  }, [visible, onVisibleChange])

  async function checkConnection(showConnecting = true) {
    if (showConnecting) {
      setStatus("connecting")
      setVisible(true)
    }

    if (!navigator.onLine) {
      setStatus("offline")
      setVisible(true)
      return
    }

    for (const url of apiUrls) {
      const controller = new AbortController()

      const timeout = window.setTimeout(() => {
        controller.abort()
      }, 3000)

      try {
        await fetch(`${url}?v=${Date.now()}`, {
          method: "HEAD",
          mode: "no-cors",
          signal: controller.signal,
        })

        clearTimeout(timeout)

        setStatus("online")

        window.setTimeout(() => {
          setVisible(false)
        }, 1500)

        return
      } catch {
        clearTimeout(timeout)
      }
    }

    setStatus("disconnected")
    setVisible(true)
  }

  useEffect(() => {
    const timer = window.setTimeout(() => {
      checkConnection(!firstCheck.current)
      firstCheck.current = false
    }, 0)

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
      clearTimeout(timer)

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