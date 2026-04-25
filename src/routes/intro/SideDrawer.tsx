import { X, Newspaper, Heart, Wrench } from "lucide-react"
import { openApp } from "@/lib/appLink"
import { useTranslation } from "react-i18next"
import { useEffect, useState } from "react"

type SideDrawerProps = {
  open: boolean
  onClose: () => void
}

type AppSubdomain = "blog" | "sponsor" | "dev"

export function SideDrawer({ open, onClose }: SideDrawerProps) {

  const { t, i18n } = useTranslation()

  const isRTL = i18n.language === "fa" || i18n.language === "ar"

  const [drawerRTL, setDrawerRTL] = useState(isRTL)

  useEffect(() => {
    if (!open) {
      setDrawerRTL(isRTL)
    }
  }, [open, isRTL])

  const items: { icon: React.ReactNode; label: string; subdomain: AppSubdomain }[] = [
    { icon: <Newspaper size={20} />, label: t("drawer.blog"), subdomain: "blog" },
    { icon: <Heart size={20} />, label: t("drawer.sponsor"), subdomain: "sponsor" },
    { icon: <Wrench size={20} />, label: t("drawer.devTools"), subdomain: "dev" },
  ]

  return (
    <>
      {open && (
        <div
          className="fixed inset-0 bg-black/20 z-40"
          onClick={onClose}
        />
      )}

      <aside
        className={`
    fixed top-0
    ${drawerRTL ? "right-0" : "left-0"}
    h-full w-[280px]
    safari-fullscreen
    bg-surface-container
    ${drawerRTL ? "rounded-l-3xl" : "rounded-r-3xl"}
    elevation-3
    z-50
    p-6
    ios-drawer-fix
    transition-transform duration-300
    ${open
            ? "translate-x-0"
            : drawerRTL
              ? "translate-x-full"
              : "-translate-x-full"
          }
  `}
      >


        <div className="flex items-center justify-between mb-6">
          <span className="font-medium text-lg">
            {t("drawer.menu")}
          </span>

          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-surface-container-high"
          >
            <X size={20} />
          </button>
        </div>

        <nav className="flex flex-col gap-2">
          {items.map((item) => (
            <button
              key={item.label}
              onClick={() => openApp(item.subdomain)}
              className="flex items-center gap-4 px-4 py-3 rounded-full hover:bg-surface-container-high transition"
            >
              {item.icon}
              <span className="text-sm">{item.label}</span>
            </button>
          ))}
        </nav>
      </aside>
    </>
  )
}
