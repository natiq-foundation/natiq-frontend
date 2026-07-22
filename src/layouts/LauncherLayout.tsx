import { Outlet } from "react-router-dom"
import { useEffect } from "react"
import { useTranslation } from "react-i18next"
import { useSettings } from "@/context/settingsContext"
import ResponsiveMenu, { NavItem } from "@/components/modules/nav/ResponsiveNav"
import { Material } from "@yakad/symbols"

export default function LauncherLayout() {
    const { t } = useTranslation()
    const [settings, setSettings] = useSettings()
    const pwaState = settings.pwaInstallPopup

    useEffect(() => {
        const p = new URLSearchParams(window.location.search)

        if (p.get("src") === "pwa_install" && !pwaState.seen) {
            setSettings((prev) => ({
                ...prev,
                pwaInstallPopup: {
                    ...prev.pwaInstallPopup,
                    seen: true,
                },
            }))
        }
    }, [pwaState.seen, setSettings])

    return (
        <div className="min-h-screen flex flex-col bg-surface">
            <main className="flex-1 flex flex-col items-center px-4 py-10">
                <Outlet />
            </main>

            <ResponsiveMenu open>
                <NavItem
                    label={t("launcher.apps")}
                    icon={<Material icon="apps" />}
                    to="/launcher/apps"
                />
                <NavItem
                    label={t("launcher.settings")}
                    icon={<Material icon="settings" />}
                    to="/launcher/settings"
                />
            </ResponsiveMenu>
        </div>
    )
}