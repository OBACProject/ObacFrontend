// src/hooks/base/baseQuery.ts
import { useQuery, UseQueryOptions, QueryKey } from '@tanstack/react-query';

export class BaseQuery<TResponse, TParams> {
  constructor(
    private readonly _key: (params: TParams) => QueryKey,
    private readonly _fetch: (params: TParams) => Promise<TResponse>,
    private readonly defaultOptions: Partial<UseQueryOptions<TResponse>> = {
      staleTime: 1000 * 60 * 5,
      refetchOnWindowFocus: false,
      retry: 1,
    }
  ) {}

  useQuery(params: TParams, options?: UseQueryOptions<TResponse>) {
    return useQuery<TResponse>({
      queryKey: this._key(params),
      queryFn: () => this._fetch(params),
      ...this.defaultOptions,
      ...options,
    });
  }
}
