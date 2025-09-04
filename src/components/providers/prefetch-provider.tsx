"use client";

import { useCriticalPrefetch } from "@/lib/hooks/use-prefetch";

interface PrefetchProviderProps {
  children: React.ReactNode;
}

export function PrefetchProvider({ children }: PrefetchProviderProps) {
  useCriticalPrefetch();

  return <>{children}</>;
}
