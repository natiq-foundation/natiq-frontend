import { useTranslation } from "react-i18next"
import AppsMenu from "@/components/modules/apps/AppsMenu"

export default function Apps() {
    const { t } = useTranslation()

    return (
        <div className="w-full max-w-xl mt-10 flex flex-col gap-5">
            <h1 className="text-2xl font-semibold text-on-surface">
                {t("launcher.apps")}
            </h1>

            <AppsMenu />
        </div>
    )
}