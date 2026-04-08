import { ReactNode } from "react"

type Props = {
  open: boolean
  toggle: () => void
  icon: ReactNode
  children: ReactNode
  width?: string
}

export function DropdownButton({
  open,
  toggle,
  icon,
  children,
  width = "w-56"
}: Props) {
  return (
    <div className="relative">
      <button
        onClick={toggle}
        className="
        w-10 h-10
        flex items-center justify-center
        rounded-full
        hover:bg-surface-container-high
        transition
        "
      >
        {icon}
      </button>

      {open && (
        <div
          className={`
          absolute right-0 mt-3
          ${width}
          p-3
          rounded-3xl
          bg-surface-container-high
          elevation-3
          `}
        >
          {children}
        </div>
      )}
    </div>
  )
}
