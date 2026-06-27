export default function SmallAppCard() {
    return (
        <div className="w-full rounded-[24px] bg-surface-container p-4 flex items-center justify-between">
            <div className="flex flex-col items-start text-left">
                <span className="text-sm font-medium text-on-surface">App</span>
                <span className="text-xs text-on-surface-variant">Coming soon</span>
            </div>

            <div className="w-10 h-10 rounded-xl bg-surface-container-high flex items-center justify-center">
                <div className="w-5 h-5 rounded-md bg-on-surface-variant/30" />
            </div>
        </div>
    );
}
