import { useMutation, UseMutationOptions, MutationKey } from '@tanstack/react-query';

export class BaseMutation<TResponse, TRequest, TError = Error> {
  constructor(
    private readonly _mutate: (params: TRequest) => Promise<TResponse>,
    private readonly defaultOptions: Partial<UseMutationOptions<TResponse, TError, TRequest>> = {
      retry: 0,
    }
  ) {}

  useMutation(options?: UseMutationOptions<TResponse, TError, TRequest>) {
  return useMutation<TResponse, TError, TRequest>({
    mutationFn: this._mutate,
    ...this.defaultOptions,
    ...options,
  });
}

  get mutationFn() {
    return this._mutate;
  }
}

export class BaseCreateMutation<TResponse, TRequest, TError = Error> extends BaseMutation<TResponse, TRequest, TError> {
  constructor(
    createFn: (params: TRequest) => Promise<TResponse>,
    defaultOptions?: Partial<UseMutationOptions<TResponse, TError, TRequest>>
  ) {
    super( createFn, {
      ...defaultOptions,
      retry: 0,
    });
  }
}

export class BaseUpdateMutation<TResponse, TRequest, TError = Error> extends BaseMutation<TResponse, TRequest, TError> {
  constructor(
    updateFn: (params: TRequest) => Promise<TResponse>,
    defaultOptions?: Partial<UseMutationOptions<TResponse, TError, TRequest>>
  ) {
    super( updateFn, {
      ...defaultOptions,
      retry: 0,
    });
  }
}

export class BaseDeleteMutation<TResponse, TRequest, TError = Error> extends BaseMutation<TResponse, TRequest, TError> {
  constructor(
    key: (params?: TRequest) => MutationKey,
    deleteFn: (params: TRequest) => Promise<TResponse>,
    defaultOptions?: Partial<UseMutationOptions<TResponse, TError, TRequest>>
  ) {
    super(deleteFn, {
      ...defaultOptions,
      retry: 0, 
    });
  }
}