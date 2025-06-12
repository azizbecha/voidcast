"use client"

import { ProgressProvider } from "@bprogress/next/app";

const Progress = ({ children }: { children: React.ReactNode }) => {
  return (
    <ProgressProvider
      height="4px"
      color="#fd4d4d"
      options={{ showSpinner: false }}
      shallowRouting
    >
      {children}
    </ProgressProvider>
  );
};

export default Progress;
