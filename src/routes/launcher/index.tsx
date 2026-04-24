"use client";

import { useEffect, useState } from "react";
import { usePWAInstall } from "@/context/settingsContext";

import AppCardGrid from "@/modules/AppCardGrid";
import ResponsiveMenu, { NavItem } from "@/modules/ResponsiveNav";

import { LayoutGrid, Settings as SettingsIcon } from "lucide-react";
import { SettingsDropdown } from "@/routes/intro/SettingsDropdown";
import { SettingsLink } from "./SettingsLink";

export default function Launcher() {

  const [tab, setTab] = useState<"apps" | "settings">("apps");

  const [state, setState] = usePWAInstall();

  useEffect(() => {
    const p = new URLSearchParams(window.location.search)

    if (p.get("src") === "pwa_install" && !state.seen) {
      setState({ seen: true })
    }
  }, [state.seen, setState])

  return (
    <div className="min-h-screen flex flex-col bg-surface">

      <main className="flex-1 flex flex-col items-center px-4 py-10">

        {tab === "apps" && (
          <div className="w-full max-w-xl bg-surface-container rounded-[28px] p-6 elevation-2 mt-10">
            <AppCardGrid />
          </div>
        )}

        {tab === "settings" && (
          <div className="w-full max-w-xl mt-10 flex flex-col gap-6">

            <div className="bg-surface-container p-6 rounded-3xl elevation-2">
              <SettingsDropdown />
            </div>

            <div className="bg-surface-container p-6 rounded-3xl elevation-2 flex flex-col gap-3">
              <h3 className="text-lg font-medium mb-2 text-on-surface">
                Links
              </h3>

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
  )
}
