import { Button } from "@/components/ui/button"

export default function AppFooter() {
  return (
    <footer className="mt-24 px-6">
      <div
        className="
        mx-auto
        max-w-7xl
        rounded-t-[28px]
        px-8
        py-6
        bg-surface-container
        elevation-1
      "
      >
        <div
          className="
          grid
          grid-cols-3
          items-center
          text-sm
          text-muted-foreground
        "
        >
          <div className="flex justify-start">
            <Button variant="ghost" className="px-0" asChild>
              <a href="/privacy">Privacy Policy</a>
            </Button>
          </div>

          <div />

          <div className="flex justify-end gap-4">
            <Button variant="ghost" className="px-0" asChild>
              <a
                href="https://github.com/your-repo"
                target="_blank"
                rel="noreferrer"
              >
                GitHub
              </a>
            </Button>

            <Button variant="ghost" className="px-0" asChild>
              <a href="/sponsor">Sponsor</a>
            </Button>

            <Button variant="ghost" className="px-0" asChild>
              <a href="/blog">Blog</a>
            </Button>
          </div>
        </div>
      </div>
    </footer>
  )
}
