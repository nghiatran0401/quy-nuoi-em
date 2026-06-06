"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { getFirebaseAnalytics, logFirebasePageView } from "@/lib/firebase/client";

/** Initializes Firebase Analytics and tracks App Router page views. */
export function FirebaseAnalytics() {
  const pathname = usePathname();

  useEffect(() => {
    void getFirebaseAnalytics();
  }, []);

  useEffect(() => {
    const query = window.location.search;
    const path = query ? `${pathname}${query}` : pathname;
    void logFirebasePageView(path);
  }, [pathname]);

  return null;
}
