import { useEffect, useState } from "react"

type Status = "online" | "offline" | "connecting"

type Props = {
  onVisibleChange?: (visible: boolean) => void
}


export default function OnlineStatus({ onVisibleChange }: Props) {

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



  useEffect(() => {

    onVisibleChange?.(visible)

  }, [visible, onVisibleChange])




  async function checkConnection() {

    setStatus("connecting")
    setVisible(true)


    try {

      if (!navigator.onLine) {
        setStatus("offline")
        return
      }


      const controller = new AbortController()


      const timeout = window.setTimeout(() => {
        controller.abort()
      }, 3000)



      await fetch("https://iran.ir/?v=1", {
        method: "HEAD",
        mode: "no-cors",
        signal: controller.signal,
      })


      clearTimeout(timeout)


      setStatus("online")


      window.setTimeout(() => {
        setVisible(false)
      }, 1500)



    } catch {

      setStatus("offline")
      setVisible(true)

    }

  }




  useEffect(() => {

    const timer = window.setTimeout(() => {
      checkConnection()
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