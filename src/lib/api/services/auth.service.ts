import { AUTH_ENDPOINTS } from "../endpoints/auth.endpoints";
import { UserLoginRequest } from "../models/auth/auth.request";
import { UserLoginResponse } from "../models/auth/auth.response";
import { BaseService } from "./base/base.service";


// async getStudentGrades(params: GetStudentGradesByTermYearRequest): Promise<GetGradPerTermYearByStudentIdResponse> {
//     return this.get<GetGradPerTermYearByStudentIdResponse>(GRADE_ENDPOINTS.GET_STUDENT_GRADE_BY_TERM_YEAR, params);
//   }

export class AuthService extends BaseService {
  async login(request: UserLoginRequest): Promise<UserLoginResponse> {
    return this.post<UserLoginResponse>(AUTH_ENDPOINTS.LOGIN, request);
}
}


export const authService = new AuthService();