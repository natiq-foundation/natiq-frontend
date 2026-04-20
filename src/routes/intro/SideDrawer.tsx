import { X, Newspaper, Heart, Wrench } from "lucide-react"
import { openApp } from "@/lib/appLink"

type SideDrawerProps = {
  open: boolean
  onClose: () => void
}

type AppSubdomain = "blog" | "sponsor" | "dev"

export function SideDrawer({ open, onClose }: SideDrawerProps) {
  const items: { icon: React.ReactNode; label: string; subdomain: AppSubdomain }[] = [
    { icon: <Newspaper size={20} />, label: "Blog", subdomain: "blog" },
    { icon: <Heart size={20} />, label: "Sponsor", subdomain: "sponsor" },
    { icon: <Wrench size={20} />, label: "Dev Tools", subdomain: "dev" },
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
          fixed top-0 left-0 h-full w-[280px]
          bg-surface-container
          rounded-r-3xl
          elevation-3
          z-50
          p-6
          transition-transform duration-300
          ${open ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <div className="flex items-center justify-between mb-6">
          <span className="font-medium text-lg">Menu</span>

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
