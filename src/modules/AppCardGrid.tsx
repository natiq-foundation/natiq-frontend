import { openApp } from "@/lib/appLink"
import LogoIcon from "/public/logoicon.svg?react"

type AppSubdomain = Parameters<typeof openApp>[0]

type AppItem = {
  name?: string
  subdomain?: AppSubdomain
  icon?: React.ReactNode | string
}

export default function AppsList({ small = false }: { small?: boolean }) {
  const apps: AppItem[] = [
    { name: "Quran", subdomain: "quran", icon: <LogoIcon /> },
    {},
    {},
    {},
    {},
    {},
  ]

  return (
    <div
      className={`grid grid-cols-3 ${small ? "gap-2" : "gap-6"
        } justify-items-center`}
    >
      {apps.map((app, i) => {
        const isPlaceholder = !app.subdomain

        return (
          <button
            key={i}
            disabled={isPlaceholder}
            onClick={() => app.subdomain && openApp(app.subdomain)}
            className={`
              flex flex-col items-center justify-center
              rounded-xl transition-all
              ${small
                ? "w-16 h-16 hover:bg-surface-container-high"
                : "w-24 h-24 hover:bg-surface-container-high"
              }
              ${isPlaceholder
                ? "opacity-40 cursor-default hover:bg-transparent"
                : ""
              }
            `}
          >
            {isPlaceholder ? (
              <div className="rounded-xl w-full h-full bg-surface-container-low" />
            ) : (
              <>
                <div
                  className={`flex items-center justify-center rounded-xl ${small ? "w-10 h-10 mb-1" : "w-14 h-14 mb-2"
                    }`}
                >
                  {app.icon}
                </div>

                <span
                  className={`text-center font-medium ${small
                    ? "text-[10px] text-muted-foreground"
                    : "text-sm"
                    }`}
                >
                  {app.name}
                </span>
              </>
            )}
          </button>
        )
      })}
    </div>
  )
}
