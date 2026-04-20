import { ReactNode, useEffect, useRef } from "react"

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

  useEffect(() => {
    if (!open) return
    const handler = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) close()
    }
    document.addEventListener("mousedown", handler)
    return () => document.removeEventListener("mousedown", handler)
  }, [open, close])

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
            absolute right-0 mt-3 z-50
            ${width}
            p-3
            rounded-3xl
            bg-surface-container elevation-3
            animate-[fadeIn_0.15s_ease-out]
            flex flex-col gap-2
          `}
        >
          {children}
        </div>
      )}
    </div>
  )
}
