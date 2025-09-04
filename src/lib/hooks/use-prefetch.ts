"use client";

import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef } from "react";

import { URLS } from "@/lib/constants/urls";

interface UsePrefetchOptions {
  delay?: number;
  condition?: () => boolean;
}

export function usePrefetch(
  routes: string[],
  options: UsePrefetchOptions = {},
) {
  const router = useRouter();
  const { delay = 0, condition } = options;
  const prefetchedRoutes = useRef<Set<string>>(new Set());

  const prefetchRoute = useCallback(
    (route: string) => {
      if (prefetchedRoutes.current.has(route)) return;

      if (condition && !condition()) return;

      if (route.startsWith("/")) {
        router.prefetch(route);
        prefetchedRoutes.current.add(route);

        if (process.env.NODE_ENV === "development") {
          console.log("🚀 Prefetched route:", route);
        }
      }
    },
    [router, condition],
  );

  const prefetchAll = useCallback(() => {
    routes.forEach((route) => {
      if (delay > 0) {
        setTimeout(() => prefetchRoute(route), delay);
      } else {
        prefetchRoute(route);
      }
    });
  }, [routes, delay, prefetchRoute]);

  const prefetchSingle = useCallback(
    (route: string) => {
      if (delay > 0) {
        setTimeout(() => prefetchRoute(route), delay);
      } else {
        prefetchRoute(route);
      }
    },
    [delay, prefetchRoute],
  );

  return {
    prefetchAll,
    prefetchSingle,
    prefetchRoute,
  };
}

export function useCriticalPrefetch() {
  /**
   * Prefetch critical routes after initial load.
   * Skipped on slow connections.
   */
  const { prefetchAll } = usePrefetch(
    [
      URLS.PROJECTS_LIST(),
      URLS.ARTICLES_LIST(),
      URLS.COMMUNITY_LIST(),
      URLS.ABOUT(),
    ],
    {
      delay: 1000,
      condition: () => {
        if (typeof navigator !== "undefined" && "connection" in navigator) {
          const connection = (
            navigator as { connection?: { effectiveType?: string } }
          ).connection;
          return !connection || connection.effectiveType !== "slow-2g";
        }
        return true;
      },
    },
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      prefetchAll();
    }, 2000);

    return () => clearTimeout(timer);
  }, [prefetchAll]);
}
