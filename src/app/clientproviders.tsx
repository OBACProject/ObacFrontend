// app/ClientProviders.tsx
"use client";

import { QueryClientProvider, QueryClient } from '@tanstack/react-query';

const queryClient = new QueryClient();


export default function ClientProviders(props: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      {props.children}
    </QueryClientProvider>
  );
}
