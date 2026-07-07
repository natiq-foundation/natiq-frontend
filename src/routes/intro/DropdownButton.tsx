import { ReactNode, useEffect } from "react"
import { useTranslation } from "react-i18next"

import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

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
  const { i18n } = useTranslation()
  const isRTL = i18n.dir() === "rtl"

  useEffect(() => {
    if (open) close()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [i18n.language])

  return (
    <Popover open={open} onOpenChange={(value) => (value ? toggle() : close())}>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full hover:bg-surface-container-high"
        >
          {icon}
        </Button>
      </PopoverTrigger>

      <PopoverContent
        align={isRTL ? "start" : "end"}
        sideOffset={12}
        className={`${width} rounded-3xl border-0 bg-surface-container p-3 elevation-3`}
      >
        <div className="flex flex-col gap-2">
          {children}
        </div>
      </PopoverContent>
    </Popover>
  )
}