"use client";

import { createLocalStorageContext, LangCodeType } from "@yakad/lib";

export interface Settings {
    themeMode: "system" | "dark" | "light";
    language: "system" | LangCodeType;

    pwaInstallPopup: {
        seen: boolean;
    };
}

const defaultSettings: Settings = {
    themeMode: "system",
    language: "system",

    pwaInstallPopup: {
        seen: false,
    },
};

export const [SettingsProvider, useSettings] =
    createLocalStorageContext<Settings>("settings", defaultSettings);
