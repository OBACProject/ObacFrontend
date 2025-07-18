import { useMutation, type UseMutationOptions } from "@tanstack/react-query"

export function useBaseMutation<TResponse, TRequest, TError = Error>(
  mutateFn: (params: TRequest) => Promise<TResponse>,
  options?: UseMutationOptions<TResponse, TError, TRequest>,
) {
  return useMutation<TResponse, TError, TRequest>({
    mutationFn: mutateFn,
    ...options,
  })
}

export function useBaseCreateMutation<TResponse, TRequest, TError = Error>(
  createFn: (params: TRequest) => Promise<TResponse>,
  options?: Partial<UseMutationOptions<TResponse, TError, TRequest>>,
) {
  return useBaseMutation(createFn, {
    ...options,
    retry: 0,
  })
}

export function useBaseUpdateMutation<TResponse, TRequest, TError = Error>(
  updateFn: (params: TRequest) => Promise<TResponse>,
  options?: Partial<UseMutationOptions<TResponse, TError, TRequest>>,
) {
  return useBaseMutation(updateFn, {
    ...options,
    retry: 0,
  })
}

export function useBasePatchMutation<TResponse, TRequest, TError = Error>(
  patchFn: (params: TRequest) => Promise<TResponse>,
  options?: Partial<UseMutationOptions<TResponse, TError, TRequest>>,
) {
  return useBaseMutation(patchFn, {
    ...options,
    retry: 0,
  })
}

export function useBaseDeleteMutation<TResponse, TRequest, TError = Error>(
  deleteFn: (params: TRequest) => Promise<TResponse>,
  options?: Partial<UseMutationOptions<TResponse, TError, TRequest>>,
) {
  return useBaseMutation(deleteFn, {
    ...options,
    retry: 0,
  })
}
