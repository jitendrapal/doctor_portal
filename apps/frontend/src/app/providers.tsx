"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import { ConnectionProvider } from "@/features/network/connection-context";

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <ConnectionProvider>{children}</ConnectionProvider>
    </QueryClientProvider>
  );
}
