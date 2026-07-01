type LinkProps = {
    label: string;
    href: string;
};

export function SettingsLink({ label, href }: LinkProps) {
    return (
        <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="
                flex items-center justify-between
                px-4 py-3 rounded-2xl
                bg-surface-container-low
                hover:bg-surface-container-high
                transition-colors
                text-on-surface
            "
        >
            <span className="text-sm font-medium">
                {label}
            </span>


        </a>
    );
}
