import { openApp } from "@/lib/appLink"
import LogoIcon from "@/assets/icons/logoicon.svg?react"
import { useTranslation } from "react-i18next"

type AppSubdomain = Parameters<typeof openApp>[0]

type AppItem = {
    name?: string
    subdomain?: AppSubdomain
    icon?: React.ComponentType<{ className?: string }>
    description?: string
    featured?: boolean
}

const apps: AppItem[] = [
    {
        name: "Quran",
        subdomain: "quran",
        icon: LogoIcon,
        description: "Read and listen to the Holy Quran",
        featured: true,
    },
    {},
    {},
    {},
    {},
]

export default function AppsMenu() {
    const { t } = useTranslation()

    const featured = apps.find((a) => a.featured)
    const secondary = apps.filter((a) => !a.featured)

    return (
        <div className="flex flex-col gap-3">
            {featured && (
                <button
                    onClick={() => featured.subdomain && openApp(featured.subdomain)}
                    className="w-full rounded-[24px] bg-surface-container p-5 elevation-2 flex items-center justify-between hover:elevation-3 transition-all"
                >
                    <div className="flex flex-col items-start gap-0.5 text-left">
                        <span className="text-base font-semibold text-on-surface">
                            {featured.name}
                        </span>
                        {featured.description && (
                            <span className="text-xs text-on-surface-variant">
                                {featured.description}
                            </span>
                        )}
                    </div>
                    <div className="w-12 h-12 rounded-2xl bg-primary-container flex items-center justify-center shrink-0 overflow-hidden">
                        {featured.icon && (
                            <featured.icon className="w-7 h-7 text-on-primary-container" />
                        )}
                    </div>
                </button>
            )}

            <div className="grid grid-cols-2 gap-2">
                {secondary.map((app, i) => {
                    const isPlaceholder = !app.subdomain
                    return (
                        <button
                            key={i}
                            disabled={isPlaceholder}
                            onClick={() => app.subdomain && openApp(app.subdomain)}
                            className={`
                                w-full rounded-[20px] bg-surface-container p-3.5
                                flex items-center justify-between gap-2 transition-all
                                ${isPlaceholder ? "opacity-40 cursor-default" : "hover:elevation-2"}
                            `}
                        >
                            <div className="flex flex-col items-start text-left min-w-0">
                                <span className="text-sm font-medium text-on-surface truncate">
                                    {isPlaceholder ? "App" : app.name}
                                </span>
                                <span className="text-xs text-on-surface-variant truncate">
                                    {isPlaceholder ? t("launcher.comingSoon") : app.description}
                                </span>
                            </div>
                            <div className="w-9 h-9 rounded-xl bg-surface-container-high flex items-center justify-center shrink-0">
                                {isPlaceholder ? (
                                    <div className="w-4 h-4 rounded-md bg-on-surface-variant/30" />
                                ) : (
                                    app.icon && <app.icon className="w-4 h-4" />
                                )}
                            </div>
                        </button>
                    )
                })}
            </div>
        </div>
    )
}