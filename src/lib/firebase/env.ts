import { firebaseClientConfig } from "@/config/firebase";

export type FirebaseClientConfig = {
  apiKey: string;
  authDomain: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
  measurementId: string;
};

function readEnv(name: string): string | undefined {
  const value = process.env[name];
  return value && value.trim().length > 0 ? value.trim() : undefined;
}

function pickConfigValue(
  envName: keyof typeof envToConfigKey,
  fallback: string,
): string | undefined {
  const fromEnv = readEnv(envToConfigKey[envName]);
  return fromEnv ?? fallback;
}

const envToConfigKey = {
  apiKey: "NEXT_PUBLIC_FIREBASE_API_KEY",
  authDomain: "NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN",
  projectId: "NEXT_PUBLIC_FIREBASE_PROJECT_ID",
  storageBucket: "NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET",
  messagingSenderId: "NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID",
  appId: "NEXT_PUBLIC_FIREBASE_APP_ID",
  measurementId: "NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID",
} as const;

/** Public Firebase web config (safe for browser). Env vars override defaults. */
export function getFirebaseConfig(): FirebaseClientConfig | null {
  const apiKey = pickConfigValue("apiKey", firebaseClientConfig.apiKey);
  const authDomain = pickConfigValue("authDomain", firebaseClientConfig.authDomain);
  const projectId = pickConfigValue("projectId", firebaseClientConfig.projectId);
  const storageBucket = pickConfigValue(
    "storageBucket",
    firebaseClientConfig.storageBucket,
  );
  const messagingSenderId = pickConfigValue(
    "messagingSenderId",
    firebaseClientConfig.messagingSenderId,
  );
  const appId = pickConfigValue("appId", firebaseClientConfig.appId);
  const measurementId = pickConfigValue(
    "measurementId",
    firebaseClientConfig.measurementId,
  );

  if (
    !apiKey ||
    !authDomain ||
    !projectId ||
    !storageBucket ||
    !messagingSenderId ||
    !appId ||
    !measurementId
  ) {
    return null;
  }

  return {
    apiKey,
    authDomain,
    projectId,
    storageBucket,
    messagingSenderId,
    appId,
    measurementId,
  };
}

export function isFirebaseConfigured(): boolean {
  return getFirebaseConfig() !== null;
}

export function isFirebaseAnalyticsDebugEnabled(): boolean {
  return readEnv("NEXT_PUBLIC_FIREBASE_ANALYTICS_DEBUG") === "true";
}
