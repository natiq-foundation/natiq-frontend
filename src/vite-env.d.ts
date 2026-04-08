///  <reference types="vite/client" />
/// <reference types="vite-plugin-pwa/client" />

declare module "*.svg?react" {
  import * as React from "react";
  const content: React.FunctionComponent<React.SVGAttributes<SVGElement>>;
  export default content;
}
interface ImportMetaEnv {
  readonly VITE_BASE_DOMAIN: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
