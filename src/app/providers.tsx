"use client";

import { ProgressProvider } from "@bprogress/next/app";

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <ProgressProvider
      height="1.5px"
      color="var(--muted-foreground)"
      options={{ showSpinner: false }}
      shallowRouting
      delay={2000}
    >
      {children}
    </ProgressProvider>
  );
};

export default Providers;
