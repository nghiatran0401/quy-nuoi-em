"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { getFirebaseConfig } from "@/lib/firebase/env";
import { getFirebaseAnalytics, logFirebasePageView } from "@/lib/firebase/client";

/** Initializes Firebase Analytics and tracks App Router page views. */
export function FirebaseAnalytics() {
  const pathname = usePathname();

  useEffect(() => {
    const config = getFirebaseConfig();
    if (!config) {
      return;
    }

    let cancelled = false;

    void (async () => {
      const instance = await getFirebaseAnalytics();
      if (cancelled || !instance) {
        return;
      }

      const query = window.location.search;
      const path = query ? `${pathname}${query}` : pathname;
      await logFirebasePageView(path);
    })();

    return () => {
      cancelled = true;
    };
  }, [pathname]);

  return null;
}
