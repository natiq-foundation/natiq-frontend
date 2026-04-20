"use client";

import { createLocalStorageContext, LangCodeType } from "@yakad/lib";

export interface Settings {
    themeMode: "system" |"dark" | "light";
    language: "system" |  LangCodeType;

}

const defaultSettings: Settings = {
    themeMode: "system",
    language: "system",
};

const [SettingsProvider, useSettings] =
    createLocalStorageContext<Settings>(
        "settings",
        defaultSettings
    );

export { SettingsProvider, useSettings };