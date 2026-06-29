"use client";

import * as React from "react";
import { createPortal } from "react-dom";
import { XIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type Side = "top" | "right" | "bottom" | "left";

const SheetContext = React.createContext<{
    open: boolean;
    onClose: () => void;
}>({ open: false, onClose: () => { } });

function Sheet({
    open = false,
    onOpenChange,
    children,
}: {
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
    children: React.ReactNode;
}) {
    const onClose = () => onOpenChange?.(false);

    React.useEffect(() => {
        if (!open) return;
        const handler = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };
        document.addEventListener("keydown", handler);
        return () => document.removeEventListener("keydown", handler);
    }, [open]);

    return (
        <SheetContext.Provider value={{ open, onClose }}>
            {children}
        </SheetContext.Provider>
    );
}

function SheetTrigger({
    children,
    ...props
}: React.ComponentProps<"button">) {
    const { onClose } = React.useContext(SheetContext);
    return (
        <button onClick={onClose} {...props}>
            {children}
        </button>
    );
}

function SheetClose({ children, ...props }: React.ComponentProps<"button">) {
    const { onClose } = React.useContext(SheetContext);
    return (
        <button onClick={onClose} {...props}>
            {children}
        </button>
    );
}

function SheetContent({
    className,
    children,
    side = "right",
    ...props
}: React.ComponentProps<"div"> & { side?: Side }) {
    const { open, onClose } = React.useContext(SheetContext);

    const translateClass = {
        left: open ? "translate-x-0" : "-translate-x-full",
        right: open ? "translate-x-0" : "translate-x-full",
        top: open ? "translate-y-0" : "-translate-y-full",
        bottom: open ? "translate-y-0" : "translate-y-full",
    }[side];

    const positionClass = {
        left: "inset-y-0 left-0 h-full w-3/4 border-r sm:max-w-sm",
        right: "inset-y-0 right-0 h-full w-3/4 border-l sm:max-w-sm",
        top: "inset-x-0 top-0 h-auto border-b",
        bottom: "inset-x-0 bottom-0 h-auto border-t",
    }[side];

    if (typeof window === "undefined") return null;

    return createPortal(
        <>
            {/* Overlay */}
            <div
                className={cn(
                    "fixed inset-0 z-50 bg-black/50 transition-opacity duration-300",
                    open ? "opacity-100" : "opacity-0 pointer-events-none"
                )}
                onClick={onClose}
            />

            {/* Drawer */}
            <div
                data-slot="sheet-content"
                className={cn(
                    "fixed z-50 flex flex-col gap-4 shadow-lg bg-background",
                    "transition-transform duration-300 ease-in-out",
                    positionClass,
                    translateClass,
                    className
                )}
                {...props}
            >
                {children}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 rounded-xs opacity-70 hover:opacity-100 transition-opacity"
                >
                    <XIcon className="size-4" />
                    <span className="sr-only">Close</span>
                </button>
            </div>
        </>,
        document.body
    );
}

function SheetHeader({ className, ...props }: React.ComponentProps<"div">) {
    return (
        <div
            data-slot="sheet-header"
            className={cn("flex flex-col gap-1.5 p-4", className)}
            {...props}
        />
    );
}

function SheetFooter({ className, ...props }: React.ComponentProps<"div">) {
    return (
        <div
            data-slot="sheet-footer"
            className={cn("mt-auto flex flex-col gap-2 p-4", className)}
            {...props}
        />
    );
}

function SheetTitle({ className, ...props }: React.ComponentProps<"h2">) {
    return (
        <h2
            data-slot="sheet-title"
            className={cn("text-foreground font-semibold", className)}
            {...props}
        />
    );
}

function SheetDescription({ className, ...props }: React.ComponentProps<"p">) {
    return (
        <p
            data-slot="sheet-description"
            className={cn("text-muted-foreground text-sm", className)}
            {...props}
        />
    );
}

export {
    Sheet,
    SheetTrigger,
    SheetClose,
    SheetContent,
    SheetHeader,
    SheetFooter,
    SheetTitle,
    SheetDescription,
};