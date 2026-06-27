"use client";

import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { useSettings } from "@/context/settingsContext";

import ResponsiveMenu, { NavItem } from "@/components/modules/nav/ResponsiveNav";

import { SettingsDropdown } from "@/routes/intro/SettingsDropdown";
import { SettingsLink } from "./SettingsLink";
import { openApp } from "@/lib/appLink";

import LogoIcon from "/public/logoicon.svg?react";
import SmallAppCard from "./SmallAppCard";
import { Material } from "@yakad/symbols";


export default function Launcher() {
  const { t } = useTranslation();

  const [tab, setTab] = useState<"apps" | "settings">("apps");
  const [settings, setSettings] = useSettings();

  const pwaState = settings.pwaInstallPopup;

  useEffect(() => {
    const p = new URLSearchParams(window.location.search);

    if (p.get("src") === "pwa_install" && !pwaState.seen) {
      setSettings((prev) => ({
        ...prev,
        pwaInstallPopup: {
          ...prev.pwaInstallPopup,
          seen: true,
        },
      }));
    }
  }, [pwaState.seen, setSettings]);

  return (
    <div className="min-h-screen flex flex-col bg-surface">
      <main className="flex-1 flex flex-col items-center px-4 py-10">
        {tab === "apps" && (
          <div className="w-full max-w-xl mt-10 flex flex-col gap-5">
            <h1 className="text-2xl font-semibold text-on-surface">
              {t("launcher.apps")}
            </h1>

            <button
              onClick={() => openApp("quran")}
              className="w-full rounded-[28px] bg-surface-container p-6 elevation-2 flex items-center justify-between hover:elevation-3 transition-all"
            >
              <div className="flex flex-col items-start gap-1 text-left">
                <span className="text-lg font-semibold text-on-surface">
                  {t("launcher.quran")}
                </span>

                <span className="text-sm text-on-surface-variant">
                  {t("launcher.quranDescription")}
                </span>
              </div>

              <div className="w-14 h-14 rounded-2xl bg-primary-container flex items-center justify-center">
                <LogoIcon className="w-8 h-8 text-on-primary-container" />
              </div>
            </button>

            <div className="grid grid-cols-2 gap-3">
              <SmallAppCard />
              <SmallAppCard />
              <SmallAppCard />
              <SmallAppCard />
            </div>
          </div>
        )}

        {tab === "settings" && (
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
        )}
      </main>

      <ResponsiveMenu open>
        <NavItem
          label={t("launcher.apps")}
          icon={
            <Material icon="apps" />

          }
          active={tab === "apps"}
          onClick={() => setTab("apps")}
        />

        <NavItem
          label={t("launcher.settings")}
          icon={
            <Material icon="settings" filled={tab === "settings"} />
          }
          active={tab === "settings"}
          onClick={() => setTab("settings")}
        />

      </ResponsiveMenu>
    </div>
  );
}
