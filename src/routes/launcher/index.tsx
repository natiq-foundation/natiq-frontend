import { AppBar } from "@/routes/intro/AppBar"
import AppCardGrid from "@/modules/AppCardGrid"

export default function Launcher() {
  return (
    <div className="min-h-screen flex flex-col bg-surface">
      {/* Top App Bar */}
      <AppBar hideApps />

      <main
        className="
        flex-1 flex flex-col items-center justify-center
        px-6 py-20
        bg-surface
        "
      >
        {/* hero / heading */}
        <div
          className="
          text-center mb-14
          flex flex-col items-center gap-4
          "
        >
          <h1 className="text-display-medium font-semibold tracking-tight text-on-surface">
            Welcome back
          </h1>

          <p className="text-body-large text-on-surface-variant">
            Choose an app to get started
          </p>
        </div>

        {/* card container */}
        <div
          className="
          w-full max-w-xl
          bg-surface-container
          p-8
          rounded-[28px]
          elevation-2
          flex justify-center
          transition-shadow
          hover:elevation-3
          "
        >
          <AppCardGrid />
        </div>

      </main>
    </div>
  )
}
