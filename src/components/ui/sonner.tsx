"use client"

import { Material } from "@yakad/symbols"

import { useTheme } from "next-themes"
import { Toaster as Sonner, type ToasterProps } from "sonner"

const Toaster = ({ ...props }: ToasterProps) => {
    const { theme = "system" } = useTheme()

    return (
        <Sonner
            theme={theme as ToasterProps["theme"]}
            className="toaster group"
            icons={{
                success: <Material icon="check_circle" className="size-4" />,
                info: <Material icon="info" className="size-4" />,
                warning: <Material icon="triangle_circle" className="size-4" />,
                error: <Material icon="close" className="size-4" />,
                loading: <Material icon="clock_loader_20" className="size-4 animate-spin" />,
            }}
            style={
                {
                    "--normal-bg": "var(--popover)",
                    "--normal-text": "var(--popover-foreground)",
                    "--normal-border": "var(--border)",
                    "--border-radius": "var(--radius)",
                } as React.CSSProperties
            }
            {...props}
        />
    )
}

export { Toaster }
