// grade.queries.ts
import { UserLoginRequest } from '@/lib/api/models/auth/auth.request';
import { UserLoginResponse } from '@/lib/api/models/auth/auth.response';
import { authService } from '@/lib/api/services/auth.service';
import { BaseCreateMutation  } from './base/base.mutation';



export const loginMutation = new BaseCreateMutation<UserLoginResponse, UserLoginRequest>(
  (params) => authService.login(params)
);