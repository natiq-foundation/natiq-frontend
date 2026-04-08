import { useEffect, useState } from "react"
import { useBeforeInstallPrompt } from "@/hooks/useBeforeInstallPrompt"
import { isPWA, isAndroid, isIOS, } from "@/lib/isPWA"

const LS_ANDROID_KEY = "androidInstallPromptDismissed"

export default function InstallPrompt() {
  const { canInstall, triggerInstall } = useBeforeInstallPrompt()
  const [showAndroidCard, setShowAndroidCard] = useState(false)

  useEffect(() => {
    if (typeof window === "undefined") return
    if (isPWA()) return // اگر نصب شده، هیچ UI نشان نده
    const dismissed = localStorage.getItem(LS_ANDROID_KEY) === "true"

    // فقط اندروید + وقتی event رسیده
    if (!dismissed && isAndroid() && canInstall) {
      setShowAndroidCard(true)
    }
  }, [canInstall])

  if (isPWA()) return null

  // iOS راهنمای مستقل دارد (IOSGuide را جدا اضافه می‌کنیم)
  // اینجا فقط کارت اندروید را هندل می‌کنیم
  if (!showAndroidCard || isIOS()) return null

  const onInstall = async () => {
    const result = await triggerInstall()
    // نتیجه ممکن است accepted یا dismissed باشد
    // اگر accepted بود، صفحه خودکار بسته می‌شود
    // اگر dismissed شد، می‌توانید دوباره بعداً نشان بدهید
    if (result.started) {
      // به‌هرحال کارت را می‌بندیم
      setShowAndroidCard(false)
      localStorage.setItem(LS_ANDROID_KEY, "true")
    }
  }

  const dismiss = () => {
    setShowAndroidCard(false)
    localStorage.setItem(LS_ANDROID_KEY, "true")
  }

  return (
    <div className="fixed bottom-6 left-6 right-6 z-50 sm:left-auto sm:right-6 sm:w-[360px]">
      <div className="bg-surface-container rounded-[28px] p-4 elevation-3 border border-outline-variant/30">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-full bg-primary/20 grid place-items-center">
            <span className="text-primary text-xl">⇩</span>
          </div>
          <div className="flex-1">
            <h3 className="text-title-medium text-on-surface mb-1">نصب اپلیکیشن</h3>
            <p className="text-body-medium text-on-surface-variant">
              برای تجربه سریع‌تر و تمام‌صفحه، اپلیکیشن را روی دستگاه نصب کنید.
            </p>
          </div>
        </div>

        <div className="mt-4 flex items-center justify-end gap-2">
          <button
            className="h-10 px-4 rounded-full text-label-large text-primary hover:bg-primary/10"
            onClick={dismiss}
          >
            بعداً
          </button>
          <button
            className="h-10 px-4 rounded-full bg-primary text-on-primary text-label-large hover:brightness-[0.95]"
            onClick={onInstall}
          >
            نصب
          </button>
        </div>
      </div>
    </div>
  )
}
