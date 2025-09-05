"use client";

import { useCriticalPrefetch } from "../helpers/use-prefetch";

interface PrefetchProviderProps {
  children: React.ReactNode;
}

export function PrefetchProvider({ children }: PrefetchProviderProps) {
  useCriticalPrefetch();

  return <>{children}</>;
}
