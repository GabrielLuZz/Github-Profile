"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode, useState } from "react";
import { GitHubRepository, GitHubUser } from "@/services/api";

interface ProvidersProps {
  children: ReactNode;
  dehydratedState?: {
    user: { queryKey: any; data: GitHubUser | null };
    repositories: { queryKey: any; data: GitHubRepository[] };
    starred: { queryKey: any; data: GitHubRepository[] };
  };
}

export const Providers = ({ children, dehydratedState }: ProvidersProps) => {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 1000 * 60 * 5,
            gcTime: 1000 * 60 * 10,
            retry: 1,
            refetchOnWindowFocus: false,
          },
        },
      })
  );

  if (dehydratedState) {
    if (dehydratedState.user?.data) {
      queryClient.setQueryData(dehydratedState.user.queryKey, dehydratedState.user.data);
    }
    
    if (dehydratedState.repositories?.data) {
      queryClient.setQueryData(
        dehydratedState.repositories.queryKey,
        dehydratedState.repositories.data
      );
    }
    
    if (dehydratedState.starred?.data) {
      queryClient.setQueryData(
        dehydratedState.starred.queryKey,
        dehydratedState.starred.data
      );
    }
  }

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}; 