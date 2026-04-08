import { useSearchParams } from "react-router-dom"

export default function IframePage() {
  const [params] = useSearchParams()
  const src = params.get("src")

  return (
    <div className="w-screen h-screen">
      <iframe
        src={src || ""}
        className="w-full h-full border-0"
      />
    </div>
  )
}
