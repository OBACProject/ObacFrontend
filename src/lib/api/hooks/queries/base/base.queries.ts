import { useQuery, type UseQueryOptions, type QueryKey } from "@tanstack/react-query"

export function createBaseQuery<TResponse, TParams>(
  keyFn: (params: TParams) => QueryKey,
  fetchFn: (params: TParams) => Promise<TResponse>,
  defaultOptions: Partial<Omit<UseQueryOptions<TResponse, Error, TResponse, QueryKey>, 'queryKey'>> = {
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
    retry: 1,
  },
) {
  return (
    params: TParams,
    options?: Partial<Omit<UseQueryOptions<TResponse, Error, TResponse, QueryKey>, 'queryKey'>>
  ) => {
    return useQuery<TResponse>({
      queryKey: keyFn(params),
      queryFn: () => fetchFn(params),
      ...defaultOptions,
      ...options,
    });
  };
}
