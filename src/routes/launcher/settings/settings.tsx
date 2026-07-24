import { useTranslation } from "react-i18next"
import { SettingsDropdown } from "@/routes/intro/SettingsDropdown"
import { SettingsLink } from "../SettingsLink"

export default function Settings() {
    const { t } = useTranslation()

    return (
        <div className="w-full max-w-xl mt-10 flex flex-col gap-6">
            <div className="flex flex-col gap-3">
                <h2 className="text-xl font-semibold text-on-surface">
                    {t("launcher.settings")}
                </h2>

                <div className="bg-surface-container p-6 rounded-3xl elevation-2">
                    <SettingsDropdown />
                </div>
            </div>

            <div className="flex flex-col gap-3">
                <h2 className="text-xl font-semibold text-on-surface">
                    {t("launcher.links")}
                </h2>

                <div className="bg-surface-container p-6 rounded-3xl elevation-2 flex flex-col gap-3">
                    <SettingsLink
                        label={t("launcher.developer")}
                        href={import.meta.env.VITE_APP_DEV as string}
                    />
                    <SettingsLink
                        label={t("launcher.sponsor")}
                        href={import.meta.env.VITE_APP_SPONSOR as string}
                    />
                    <SettingsLink
                        label={t("launcher.blog")}
                        href={import.meta.env.VITE_APP_BLOG as string}
                    />
                </div>
            </div>
        </div>
    )
}