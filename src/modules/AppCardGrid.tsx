import { openApp } from "@/lib/appLink"

export default function AppsList({ small = false }: { small?: boolean }) {
  const apps = [
    { name: "Quran", subdomain: "quran", icon: "/logoicon.svg" },
    { name: "", subdomain: "", icon: "" },
    { name: "", subdomain: "", icon: "" },
    { name: "", subdomain: "", icon: "" },
    { name: "", subdomain: "", icon: "" },
    { name: "", subdomain: "", icon: "" },
  ]

  return (
    <div
      className={`grid grid-cols-3 ${
        small ? "gap-2" : "gap-6"
      } justify-items-center`}
    >
      {apps.map((app, i) => (
        <button
          key={i}
          disabled={!app.subdomain}
          onClick={() => app.subdomain && openApp(app.subdomain)}
          className={`
            flex flex-col items-center justify-center
            rounded-2xl
            transition-all
            ${
              app.subdomain
                ? small
                  ? "w-16 h-16 hover:bg-surface-container-high"
                  : "w-24 h-24 bg-surface-container elevation-1 hover:elevation-2"
                : small
                ? "w-16 h-16"
                : "w-24 h-24"
            }
          `}
        >
          {app.icon ? (
            <>
              <div
                className={`
                flex items-center justify-center rounded-xl overflow-hidden
                ${small ? "w-10 h-10 mb-1" : "w-14 h-14 mb-2"}
              `}
              >
                <img
                  src={app.icon}
                  alt={app.name}
                  className="w-full h-full object-contain"
                />
              </div>

              <span
                className={`
                text-center font-medium
                ${
                  small
                    ? "text-[10px] text-muted-foreground"
                    : "text-sm"
                }
              `}
              >
                {app.name}
              </span>
            </>
          ) : (
            <div className="rounded-xl w-full h-full bg-surface-container-low" />
          )}
        </button>
      ))}
    </div>
  )
}
