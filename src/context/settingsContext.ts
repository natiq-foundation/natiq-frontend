"use client";

import { createLocalStorageContext, LangCodeType } from "@yakad/lib";

export interface Settings {
    themeMode: "system" | "dark" | "light";
    language: "system" | LangCodeType;
}

const defaultSettings: Settings = {
    themeMode: "system",
    language: "system",
};

export const [SettingsProvider, useSettings] =
    createLocalStorageContext<Settings>("settings", defaultSettings);

export interface PWAInstallState {
    seen: boolean;
}

const defaultPWAInstallState: PWAInstallState = {
    seen: false,
};

export const [PWAInstallProvider, usePWAInstall] =
    createLocalStorageContext<PWAInstallState>("pwa-install", defaultPWAInstallState);
