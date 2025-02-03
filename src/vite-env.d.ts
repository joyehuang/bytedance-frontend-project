/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_COZE_API_TOKEN: string;
  readonly VITE_COZE_BOT_ID: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
