import { Button } from "@/components/ui/button"
import { openApp } from "@/lib/appLink"

export default function AppFooter() {
  return (
    <footer className="px-6">
      <div className="mx-auto max-w-7xl rounded-t-[28px] px-8 py-6 bg-surface-container elevation-1">
        <div className="flex flex-col-reverse md:grid md:grid-cols-3 items-center text-sm text-muted-foreground gap-4">

          <div className="flex justify-start">
            <Button variant="ghost" className="px-0" asChild>
              <a href="https://blog.natiq.net/privacypolicy" target="_blank">Privacy Policy</a>
            </Button>
          </div>

          <div />

          <div className="flex flex-col md:flex-row justify-end gap-3 md:gap-4">
            <Button variant="ghost" className="px-0" onClick={() => openApp("dev")}>DevTools</Button>
            <Button variant="ghost" className="px-0" onClick={() => openApp("sponsor")}>Sponsor</Button>
            <Button variant="ghost" className="px-0" onClick={() => openApp("blog")}>Blog</Button>
          </div>

        </div>
      </div>
    </footer>
  )
}

