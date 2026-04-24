type LinkProps = {
    label: string
    href: string
}

export function SettingsLink({ label, href }: LinkProps) {
    return (
        <a
            href={href}
            target="_blank"
            className="flex items-center justify-between px-4 py-3 rounded-xl 
                 bg-surface-container-low hover:bg-surface-container-high 
                 transition text-on-surface"
        >
            <span className="text-body-medium">{label}</span>
            <span className="text-primary text-sm">Open →</span>
        </a>
    )
}
