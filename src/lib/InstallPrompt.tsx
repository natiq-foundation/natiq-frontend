import { useEffect, useState } from "react"
import { useBeforeInstallPrompt } from "@/hooks/useBeforeInstallPrompt"
import { isPWA, isAndroid, isIOS } from "@/lib/isPWA"
import { usePWAInstall } from "@/context/settingsContext"
import { pwaInstallPopupEnabled } from "@/lib/isPWA"


export default function InstallPrompt() {

  const { canInstall, triggerInstall } = useBeforeInstallPrompt()
  const [showAndroidCard, setShowAndroidCard] = useState(false)

  const [state, setState] = usePWAInstall()

  useEffect(() => {
    if (typeof window === "undefined") return



    if (!state.seen && isAndroid() && canInstall) {
      setShowAndroidCard(true)
    }
  }, [canInstall, state.seen])

  if (isPWA()) return null
  if (!pwaInstallPopupEnabled()) return null
  if (state.seen) return null
  if (!showAndroidCard || isIOS()) return null

  const onInstall = async () => {
    const result = await triggerInstall()
    if (result.started) {
      setShowAndroidCard(false)
      setState({ seen: true })
    }
  }

  const dismiss = () => {
    setShowAndroidCard(false)
    setState({ seen: true })
  }

  return (
    <div className="fixed bottom-6 left-6 right-6 z-50 sm:left-auto sm:right-6 sm:w-[360px]">
      <div className="bg-surface-container rounded-[28px] p-4 elevation-3 border border-outline-variant/30">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-full bg-primary/20 grid place-items-center">
            <span className="text-primary text-xl">⇩</span>
          </div>
          <div className="flex-1">
            <h3 className="text-title-medium text-on-surface mb-1">
              Install the App
            </h3>
            <p className="text-body-medium text-on-surface-variant">
              For a faster, full‑screen experience, install the app on your device.
            </p>
          </div>
        </div>

        <div className="mt-4 flex items-center justify-end gap-2">
          <button
            className="h-10 px-4 rounded-full text-label-large text-primary hover:bg-primary/10"
            onClick={dismiss}
          >
            Later
          </button>
          <button
            className="h-10 px-4 rounded-full bg-primary text-on-primary text-label-large hover:brightness-[0.95]"
            onClick={onInstall}
          >
            Install
          </button>
        </div>
      </div>
    </div>
  )
}
