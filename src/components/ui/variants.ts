import { cva } from "class-variance-authority"

export const badgeVariants = cva(
    "inline-flex items-center justify-center rounded-full border px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow] overflow-hidden",
    {
        variants: {
            variant: {
                default:
                    "border-transparent bg-primary text-primary-foreground [a&]:hover:bg-primary/90",

                secondary:
                    "border-transparent bg-secondary text-secondary-foreground [a&]:hover:bg-secondary/90",

                destructive:
                    "border-transparent bg-destructive text-white [a&]:hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",

                outline:
                    "text-foreground [a&]:hover:bg-accent [a&]:hover:text-accent-foreground",
            },
        },

        defaultVariants: {
            variant: "default",
        },
    }
)

export const buttonGroupVariants = cva(
    "flex w-fit items-stretch [&>*]:focus-visible:z-10 [&>*]:focus-visible:relative [&>[data-slot=select-trigger]:not([class*='w-'])]:w-fit [&>input]:flex-1 has-[select[aria-hidden=true]:last-child]:[&>[data-slot=select-trigger]:last-of-type]:rounded-r-md has-[>[data-slot=button-group]]:gap-2",
    {
        variants: {
            orientation: {
                horizontal:
                    "[&>*:not(:first-child)]:rounded-l-none [&>*:not(:first-child)]:border-l-0 [&>*:not(:last-child)]:rounded-r-none",

                vertical:
                    "flex-col [&>*:not(:first-child)]:rounded-t-none [&>*:not(:first-child)]:border-t-0 [&>*:not(:last-child)]:rounded-b-none",
            },
        },

        defaultVariants: {
            orientation: "horizontal",
        },
    }
)

export const buttonVariants = cva(
    "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
    {
        variants: {
            variant: {
                default: "bg-primary text-primary-foreground hover:bg-primary/90",

                destructive:
                    "bg-destructive text-white hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",

                outline:
                    "border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50",

                secondary:
                    "bg-secondary text-secondary-foreground hover:bg-secondary/80",

                ghost:
                    "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",

                link:
                    "text-primary underline-offset-4 hover:underline",
            },

            size: {
                default: "h-9 px-4 py-2 has-[>svg]:px-3",

                sm:
                    "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",

                lg:
                    "h-10 rounded-md px-6 has-[>svg]:px-4",

                icon:
                    "size-9",

                "icon-sm":
                    "size-8",

                "icon-lg":
                    "size-10",
            },
        },

        defaultVariants: {
            variant: "default",
            size: "default",
        },
    }
)