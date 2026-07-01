/// <reference types="vite/client" />
/// <reference types="vite-plugin-pwa/client" />

declare module "*.svg?react" {
  import * as React from "react"

  const ReactComponent: React.FC<
    React.SVGProps<SVGSVGElement>
  >

  export default ReactComponent
}

interface ImportMetaEnv {
  readonly VITE_BASE_DOMAIN: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}