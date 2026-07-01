import { ReactNode, useEffect, useLayoutEffect, useRef, useState } from "react"
import { useTranslation } from "react-i18next"

type Props = {
  open: boolean
  toggle: () => void
  close: () => void
  icon: ReactNode
  width?: string
  children: ReactNode
}

export function DropdownButton({
  open,
  toggle,
  close,
  icon,
  width = "w-56",
  children,
}: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const { i18n } = useTranslation()
  const isRTL = i18n.dir() === "rtl"

  const [top, setTop] = useState(0)

  // close dropdown when clicking outside
  useEffect(() => {
    if (!open) return
    const handler = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) close()
    }
    document.addEventListener("mousedown", handler)
    return () => document.removeEventListener("mousedown", handler)
  }, [open, close])

  // close dropdown when language changes
  useEffect(() => {
    if (open) close()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [i18n.language])

  // محاسبه‌ی موقعیت بعد از باز شدن، نه در حین render
  useLayoutEffect(() => {
    if (!open || !ref.current) return

    const updatePosition = () => {
      if (ref.current) {
        setTop(ref.current.getBoundingClientRect().bottom + 12)
      }
    }

    updatePosition()

    window.addEventListener("resize", updatePosition)
    window.addEventListener("scroll", updatePosition, true)
    return () => {
      window.removeEventListener("resize", updatePosition)
      window.removeEventListener("scroll", updatePosition, true)
    }
  }, [open])

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={toggle}
        className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-surface-container-high transition"
      >
        {icon}
      </button>
      {open && (
        <div
          className={`
            fixed ${isRTL ? "left-4" : "right-4"}
            mt-3 z-50
            ${width}
            p-3
            rounded-3xl
            bg-surface-container elevation-3
            animate-[fadeIn_0.15s_ease-out]
            flex flex-col gap-2
          `}
          style={{
            top,
            maxWidth: "calc(100vw - 2rem)",
          }}
        >
          {children}
        </div>
      )}
    </div>
  )
}