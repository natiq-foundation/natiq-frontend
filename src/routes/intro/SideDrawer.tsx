import { Newspaper, Heart, Wrench } from "lucide-react"
import { openApp } from "@/lib/appLink"
import { useTranslation } from "react-i18next"

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle
} from "@/components/ui/sheet"

import { Button } from "@/components/ui/button"

type SideDrawerProps = {
  open: boolean
  onClose: () => void
}

type AppSubdomain = "blog" | "sponsor" | "dev"

export function SideDrawer({ open, onClose }: SideDrawerProps) {

  const { t, i18n } = useTranslation()

  const isRTL = i18n.language === "fa" || i18n.language === "ar"

  const items: {
    icon: React.ReactNode
    label: string
    subdomain: AppSubdomain
  }[] = [
      { icon: <Newspaper size={20} />, label: t("drawer.blog"), subdomain: "blog" },
      { icon: <Heart size={20} />, label: t("drawer.sponsor"), subdomain: "sponsor" },
      { icon: <Wrench size={20} />, label: t("drawer.devTools"), subdomain: "dev" },
    ]

  return (
    <Sheet open={open} onOpenChange={(o) => !o && onClose()}>
      <SheetContent
        side={isRTL ? "right" : "left"}
        className="w-[280px] bg-surface-container p-6 border-none"
      >
        <SheetHeader className="mb-6">
          <SheetTitle className="text-lg font-medium">
            {t("drawer.menu")}
          </SheetTitle>
        </SheetHeader>

        <nav className="flex flex-col gap-2">
          {items.map((item) => (
            <Button
              key={item.label}
              variant="ghost"
              onClick={() => openApp(item.subdomain)}
              className="justify-start gap-4 px-4 py-3 rounded-full"
            >
              {item.icon}
              <span className="text-sm">{item.label}</span>
            </Button>
          ))}
        </nav>

      </SheetContent>
    </Sheet>
  )
}
