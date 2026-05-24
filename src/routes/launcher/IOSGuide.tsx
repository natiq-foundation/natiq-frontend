import { useEffect, useState } from "react"
import { isIOS, isPWA, isSafari, pwaInstallPopupEnabled } from "@/lib/isPWA"
import { useSettings } from "@/context/settingsContext"

export default function IOSGuide() {
  const [visible, setVisible] = useState(false)

  const [settings, setSettings] = useSettings()
  const state = settings.pwaInstallPopup

  useEffect(() => {
    if (typeof window === "undefined") return

    if (!state.seen && isIOS() && isSafari() && !isPWA()) {
      setVisible(true)
    }
  }, [state.seen])

  if (!visible) return null
  if (!pwaInstallPopupEnabled()) return null
  if (state.seen) return null

  const dismiss = () => {
    // فقط seen را true می‌کنیم، بقیه تنظیمات را دست نمی‌زنیم
    setSettings(prev => ({
      ...prev,
      pwaInstallPopup: { ...prev.pwaInstallPopup, seen: true },
    }))
    setVisible(false)
  }

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50">
      <div className="bg-surface-container-high rounded-[28px] p-6 w-[min(420px,calc(100%-32px))] elevation-3">
        <div className="flex items-start gap-4">
          <div className="shrink-0 w-10 h-10 rounded-full bg-primary/20 grid place-items-center">
            <span className="text-primary text-xl">★</span>
          </div>

          <div className="flex-1">
            <h2 className="text-title-large text-on-surface mb-1">
              Install the app
            </h2>

            <p className="text-body-medium text-on-surface-variant">
              To install on iPhone/iPad, in Safari tap the Share button and choose
              <b> Add to Home Screen</b>.
            </p>

            <div className="mt-4 flex items-center gap-2 rounded-2xl bg-surface-container p-3">
              <div className="w-6 h-6 rounded bg-primary grid place-items-center text-on-primary text-[12px]">
                ↑
              </div>

              <span className="text-body-small text-on-surface-variant">
                Share → Add to Home Screen
              </span>
            </div>
          </div>
        </div>

        <div className="mt-6 flex gap-2 justify-end">
          <button
            className="px-4 h-10 rounded-full text-primary text-label-large hover:bg-primary/10 transition-colors"
            onClick={dismiss}
          >
            Got it
          </button>
        </div>
      </div>
    </div>
  )
}
