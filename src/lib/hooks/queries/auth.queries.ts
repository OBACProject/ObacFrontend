// grade.queries.ts
import { UserLoginRequest } from '@/lib/api/models/auth/auth.request';
import { UserLoginResponse } from '@/lib/api/models/auth/auth.response';
import { authService } from '@/lib/api/services/auth.service';
import { BaseQuery } from '@/lib/hooks/queries/base/base.queries';



export const loginQuery = new BaseQuery<UserLoginResponse, UserLoginRequest>(
  (params) => ['group-summary', params],
  (params) => authService.login(params)
);

