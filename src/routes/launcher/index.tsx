"use client";

import { useEffect, useState } from "react";
import { useSettings } from "@/context/settingsContext";

import ResponsiveMenu, { NavItem } from "@/modules/ResponsiveNav";

import { LayoutGrid, Settings as SettingsIcon } from "lucide-react";
import { SettingsDropdown } from "@/routes/intro/SettingsDropdown";
import { SettingsLink } from "./SettingsLink";
import { openApp } from "@/lib/appLink";
import LogoIcon from "/public/logoicon.svg?react";
import SmallAppCard from "./SmallAppCard";



export default function Launcher() {
  const [tab, setTab] = useState<"apps" | "settings">("apps");
  const [settings, setSettings] = useSettings();
  const pwaState = settings.pwaInstallPopup;

  useEffect(() => {
    const p = new URLSearchParams(window.location.search);
    if (p.get("src") === "pwa_install" && !pwaState.seen) {
      setSettings((prev) => ({
        ...prev,
        pwaInstallPopup: { ...prev.pwaInstallPopup, seen: true },
      }));
    }
  }, [pwaState.seen, setSettings]);

  return (
    <div className="min-h-screen flex flex-col bg-surface">
      <main className="flex-1 flex flex-col items-center px-4 py-10">
        {tab === "apps" && (
          <div className="w-full max-w-xl mt-10 flex flex-col gap-5">
            <h1 className="text-2xl font-semibold text-on-surface">Apps</h1>

            <button
              onClick={() => openApp("quran")}
              className="w-full rounded-[28px] bg-surface-container p-6 elevation-2 flex items-center justify-between hover:elevation-3 transition-all"
            >
              <div className="flex flex-col items-start gap-1 text-left">
                <span className="text-lg font-semibold text-on-surface">Quran</span>
                <span className="text-sm text-on-surface-variant">
                  Recitation and Tafsir
                </span>
              </div>

              <div className="w-14 h-14 rounded-2xl bg-primary-container flex items-center justify-center">
                <LogoIcon className="w-8 h-8 text-on-primary-container" />
              </div>
            </button>

            {/* 2 rows like the screenshot */}
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
            <div className="bg-surface-container p-6 rounded-3xl elevation-2">
              <SettingsDropdown />
            </div>

            <div className="bg-surface-container p-6 rounded-3xl elevation-2 flex flex-col gap-3">
              <h3 className="text-lg font-medium mb-2 text-on-surface">Links</h3>
              <SettingsLink
                label="Blog"
                href={import.meta.env.VITE_BLOG_URL as string}
              />
              <SettingsLink
                label="Sponsor"
                href={import.meta.env.VITE_SPONSOR_URL as string}
              />
              <SettingsLink
                label="Developer"
                href={import.meta.env.VITE_DEV_URL as string}
              />
            </div>
          </div>
        )}
      </main>

      <ResponsiveMenu open>
        <NavItem
          label="Apps"
          icon={<LayoutGrid size={20} />}
          active={tab === "apps"}
          onClick={() => setTab("apps")}
        />
        <NavItem
          label="Settings"
          icon={<SettingsIcon size={20} />}
          active={tab === "settings"}
          onClick={() => setTab("settings")}
        />
      </ResponsiveMenu>
    </div>
  );
}
