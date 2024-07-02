/// <reference types="vite/client" />
interface ImportMetaEnv {
  readonly VITE_API_URL: string;
  readonly VITE_FCM_API_KEY: string;
  readonly VITE_FCM_AUTH_DOMAIN: string;
  readonly VITE_FCM_PROJECT_ID: string;
  readonly VITE_FCM_STORAGE_BUCKET: string;
  readonly VITE_MESSAGING_SENDER_ID: string;
  readonly VITE_FCM_APP_ID: string;
  readonly VITE_FCM_MEASUREMENT_ID: string;
  readonly VITE_FCM_VAPID_KEY: string;
}
interface ImportMeta {
  readonly env: ImportMetaEnv;
}
