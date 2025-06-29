import { setAuthCookie } from "@/lib/utils/auth-cookies";
import { AUTH_ENDPOINTS } from "../endpoints/auth.endpoints";
import { UserLoginRequest } from "../models/auth/auth.request";
import { UserLoginResponse } from "../models/auth/auth.response";
import { BaseService } from "./base/base.service";


// async getStudentGrades(params: GetStudentGradesByTermYearRequest): Promise<GetGradPerTermYearByStudentIdResponse> {
//     return this.get<GetGradPerTermYearByStudentIdResponse>(GRADE_ENDPOINTS.GET_STUDENT_GRADE_BY_TERM_YEAR, params);
//   }

export class AuthService extends BaseService {
  async login(request: UserLoginRequest): Promise<UserLoginResponse> {

    const response = await this.post<UserLoginResponse>(AUTH_ENDPOINTS.LOGIN, request); 

    // set token in cookies with secure and httpOnly flags
    const token = response.token;
    setAuthCookie(token);

    return response;
}
}


export const authService = new AuthService();