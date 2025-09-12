import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      //avoid extra network calls when focusing on winwod
      retry: 1,
      // Each failed query will retry once before showing an error (default is 3).
      staleTime: 30_000,
      //30 seconds React QUery wont retch auto if you revisit the same query.
    },
    mutations: { retry: 0 },
  },
});

// The files configures the global React QUery Client so your app has consistent caching
//rules, retry logic, and refetch policies - making API calls more predictable and avoiding
//boiler plate settings in every query/mutation
