// lib/hooks/queries/auth.queries.ts (or similar path)
import { UserLoginRequest } from '@/lib/api/models/auth/auth.request';
import { UserLoginResponse } from '@/lib/api/models/auth/auth.response';
import { authService } from '@/lib/api/services/auth.service'; 
import { useBaseCreateMutation } from './base/base.mutation';
import { UseMutationOptions } from '@tanstack/react-query';

export const useLoginMutation = (options?: Partial<UseMutationOptions<UserLoginResponse, Error, UserLoginRequest>>) => {
  return useBaseCreateMutation<UserLoginResponse, UserLoginRequest, Error>(
    authService.login.bind(authService),
    options
  );
}