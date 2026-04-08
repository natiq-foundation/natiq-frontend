import { useEffect, useState } from "react"

export default function OnlineStatus() {
  const [online, setOnline] = useState(navigator.onLine)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const goOnline = () => {
      setOnline(true)
      setVisible(true)
      setTimeout(() => setVisible(false), 2000)
    }

    const goOffline = () => {
      setOnline(false)
      setVisible(true)
    }

    window.addEventListener("online", goOnline)
    window.addEventListener("offline", goOffline)

    return () => {
      window.removeEventListener("online", goOnline)
      window.removeEventListener("offline", goOffline)
    }
  }, [])

  if (!visible) return null

  return (
    <div
      className={`
      fixed top-0 left-0 w-full h-1
      ${online ? "bg-green-500" : "bg-red-500"}
      z-[9999]
      transition-all
      `}
      title={online ? "Back to online" : "You are offline"}
    />
  )
}
