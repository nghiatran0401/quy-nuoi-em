"use client";

import { getApps, initializeApp, type FirebaseApp } from "firebase/app";
import {
  getAnalytics,
  isSupported,
  logEvent,
  setAnalyticsCollectionEnabled,
  type Analytics,
} from "firebase/analytics";
import { getFirebaseConfig, isFirebaseAnalyticsDebugEnabled } from "@/lib/firebase/env";

let app: FirebaseApp | undefined;
let analytics: Analytics | undefined;
let analyticsInitPromise: Promise<Analytics | undefined> | undefined;

function getFirebaseApp(): FirebaseApp | undefined {
  const config = getFirebaseConfig();
  if (!config) {
    return undefined;
  }

  if (!app) {
    app = getApps().length > 0 ? getApps()[0]! : initializeApp(config);
  }

  return app;
}

export async function getFirebaseAnalytics(): Promise<Analytics | undefined> {
  if (analytics) {
    return analytics;
  }

  if (analyticsInitPromise) {
    return analyticsInitPromise;
  }

  analyticsInitPromise = (async () => {
    const firebaseApp = getFirebaseApp();
    if (!firebaseApp) {
      return undefined;
    }

    const supported = await isSupported();
    if (!supported) {
      if (process.env.NODE_ENV === "development") {
        console.warn("[firebase] Analytics is not supported in this browser.");
      }
      return undefined;
    }

    analytics = getAnalytics(firebaseApp);
    setAnalyticsCollectionEnabled(analytics, true);

    if (isFirebaseAnalyticsDebugEnabled()) {
      window.localStorage.setItem("debug_mode", "true");
    }

    return analytics;
  })();

  return analyticsInitPromise;
}

export async function logFirebasePageView(path: string, title?: string): Promise<void> {
  const instance = await getFirebaseAnalytics();
  if (!instance) {
    return;
  }

  logEvent(instance, "page_view", {
    page_path: path,
    page_title: title ?? document.title,
    page_location: window.location.href,
  });
}
