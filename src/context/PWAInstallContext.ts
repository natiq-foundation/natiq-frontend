"use client";

import { createLocalStorageContext } from "@yakad/lib";

export interface PWAInstallState {
    seen: boolean;
}

const defaultState: PWAInstallState = {
    seen: false,
};

const [PWAInstallProvider, usePWAInstall] =
    createLocalStorageContext<PWAInstallState>(
        "pwa-install",
        defaultState
    );

export { PWAInstallProvider, usePWAInstall };
