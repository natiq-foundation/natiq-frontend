const REQUIRED_STRING_VARS = ["VITE_BASE_DOMAIN"] as const;

function logEnvError(message: string) {
    console.error(`[env error] ${message}`);
}

export function getRequiredEnvVar(key: string, fallback = ""): string {
    const value = import.meta.env[key];
    if (!value || typeof value !== "string" || value.trim() === "") {
        logEnvError(`Missing or empty environment variable "${key}". Using fallback: "${fallback}"`);
        return fallback;
    }
    return value;
}

export function getEnvBoolean(key: string, fallback = false): boolean {
    const value = import.meta.env[key];
    if (value === undefined) return fallback;
    return value === "true" || value === true;
}

export function getEnvUrlList(key: string): string[] {
    const raw = import.meta.env[key];
    if (!raw || typeof raw !== "string") {
        logEnvError(`Missing environment variable "${key}". Expected a comma-separated list of URLs.`);
        return [];
    }

    const urls = raw
        .split(",")
        .map((u) => u.trim())
        .filter(Boolean);

    const valid: string[] = [];
    for (const url of urls) {
        try {
            new URL(url);
            valid.push(url);
        } catch {
            logEnvError(`Invalid URL in "${key}": "${url}" — skipped.`);
        }
    }

    if (valid.length === 0) {
        logEnvError(`No valid URLs found in "${key}".`);
    }

    return valid;
}

export function validateRequiredEnv(): boolean {
    let ok = true;
    for (const key of REQUIRED_STRING_VARS) {
        const value = import.meta.env[key];
        if (!value || typeof value !== "string" || value.trim() === "") {
            logEnvError(`Required environment variable "${key}" is not set.`);
            ok = false;
        }
    }
    return ok;
}