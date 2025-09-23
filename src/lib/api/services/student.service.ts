import { STUDENT_ENDPOINTS } from "../endpoints/student.endpoints";
import { GetStudentByStudentIdRequest, GetStudentGradeDetailRequest, UpdateStudentStatusRequest, UpdateStudentRequest, GetStudentListInStudentGroupRequest, GetStudentListByClassRequest, GetStudentDetailAndGradeByStudentCodeRequest, GetStudentsByProgramIdRequest, GetAllStudentsRequest } from "../models/student/student.request";
import { GetAllStudentsResponse, GetStudentByStudentIdResponse, GetStudentDetailAndGradeByStudentCodeResponse, GetStudentGradeDetailResponse, GetStudentsByProgramIdResponse } from "../models/student/student.response";
import { BaseService } from "./base/base.service";


export class StudentService extends BaseService {
    async getAllStudents(
        params: GetAllStudentsRequest
    ): Promise<GetAllStudentsResponse> {
        return this.get<GetAllStudentsResponse>(
            STUDENT_ENDPOINTS.GET_ALL_STUDENTS,
            params
        );
    }
    async getStudentByStudentId (
        params: GetStudentByStudentIdRequest
    ): Promise<GetStudentByStudentIdResponse> {
        return this.get<GetStudentByStudentIdResponse>(
            `${STUDENT_ENDPOINTS.GET_STUDENT_BY_STUDENT_ID}/${params.studentId}`
        );
    }
    async getStudentGradeDetail(
        params: GetStudentGradeDetailRequest
    ): Promise<GetStudentGradeDetailResponse> {
        return this.get<GetStudentGradeDetailResponse>(
            `${STUDENT_ENDPOINTS.GET_STUDENT_GRADE_DETAIL}/${params.studentId}`
        );
    }
    async updateStudentStatus(
        params: UpdateStudentStatusRequest
    ): Promise<void> {
        return this.put<void>(
            `${STUDENT_ENDPOINTS.PUT_STUDENT_UPDATE_STUDENT_STATUS}/${params.studentId}`,
            { status: params.status }
        );
    }
    async updateStudent(
        params: UpdateStudentRequest
    ): Promise<void> {
        return this.put<void>(
            `${STUDENT_ENDPOINTS.PUT_STUDENT_UPDATE_STUDENT}/${params.studentId}`,
            params
        );
    }

    async getStudentListByClass(
        params: GetStudentListByClassRequest
    ): Promise<void> {
        return this.get<void>(
            `${STUDENT_ENDPOINTS.GET_STUDENT_LIST_BY_CLASS}/${params.className}/${params.level}`
        );
    }
    async getStudentDetailAndGradeByStudentCode(
        params: GetStudentDetailAndGradeByStudentCodeRequest
    ): Promise<GetStudentDetailAndGradeByStudentCodeResponse> {
        return this.get<GetStudentDetailAndGradeByStudentCodeResponse>(
            `${STUDENT_ENDPOINTS.GET_STUDENT_DETAIL_AND_GRADE_BY_STUDENT_CODE}/${params.className}/${params.level}/${params.groupName}/${params.year}/${params.term}`
        );
    }

    async getStudentsByProgramId(
        params: GetStudentsByProgramIdRequest
    ): Promise<GetStudentsByProgramIdResponse[]> {
        return this.get<GetStudentsByProgramIdResponse[]>(
            `${STUDENT_ENDPOINTS.GET_STUDENT_STUDENT_BY_PROGRAM_ID}/${params.programId}`
        );
    }

}

export const studentService = new StudentService();