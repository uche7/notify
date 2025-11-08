"use client";

import { ReactNode, useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

/** Query Provider */
export function QueryProvider({ children }: { children: ReactNode }) {
  /** Create the query client */
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 1000 * 60 * 5, // 5 minutes
            refetchOnWindowFocus: false,
            retry: 2,
          },
        },
      })
  );

  /** Return the QueryProvider */
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
