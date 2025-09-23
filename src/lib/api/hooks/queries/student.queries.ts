import { UseMutationOptions } from "@tanstack/react-query";
import { GetStudentByStudentIdRequest, GetStudentGradeDetailRequest, UpdateStudentStatusRequest, UpdateStudentRequest, GetStudentListInStudentGroupRequest, GetStudentListByClassRequest, GetStudentDetailAndGradeByStudentCodeRequest, GetStudentsByProgramIdRequest, GetAllStudentsRequest } from "../../models/student/student.request";
import { GetStudentByStudentIdResponse, GetStudentGradeDetailResponse, GetStudentDetailAndGradeByStudentCodeResponse, GetStudentsByProgramIdResponse, GetAllStudentsResponse } from "../../models/student/student.response";
import { useBaseUpdateMutation } from "./base/base.mutation";
import { createBaseQuery } from "./base/base.queries";
import { studentService } from "../../services/student.service";
import { GetAllStudent } from "@/dto/studentDto";

export const useGetAllStudentsQuery = createBaseQuery<
    GetAllStudentsResponse,GetAllStudentsRequest>(
    (params) => ['allStudents', params],
    (params) => studentService.getAllStudents(params)
    );

export const useGetStudentByStudentIdQuery = createBaseQuery<
    GetStudentByStudentIdResponse,
    GetStudentByStudentIdRequest
>(
    (params) => ['studentByStudentId', params],
    (params) => studentService.getStudentByStudentId(params),
);

export const useGetStudentGradeDetailQuery = createBaseQuery<
    GetStudentGradeDetailResponse,
    GetStudentGradeDetailRequest
>(
    (params) => ['studentGradeDetail', params],
    (params) => studentService.getStudentGradeDetail(params),
);

export const useUpdateStudentStatusMutation = (options?: Partial<UseMutationOptions<void, Error, UpdateStudentStatusRequest>>) => {
    return useBaseUpdateMutation<void, UpdateStudentStatusRequest, Error>(
        studentService.updateStudentStatus.bind(studentService),
        options
    );
};  

export const useUpdateStudentMutation = (options?: Partial<UseMutationOptions<void, Error, UpdateStudentRequest>>) => {
    return useBaseUpdateMutation<void, UpdateStudentRequest, Error>(
        studentService.updateStudent.bind(studentService),
        options
    );
};



export const useGetStudentListByClassQuery = createBaseQuery<
    void,
    GetStudentListByClassRequest
>(
    (params) => ['studentListByClass', params],
    (params) => studentService.getStudentListByClass(params),
);

export const useGetStudentDetailAndGradeByStudentCodeQuery = createBaseQuery<
    GetStudentDetailAndGradeByStudentCodeResponse,
    GetStudentDetailAndGradeByStudentCodeRequest
>(
    (params) => ['studentDetailAndGradeByStudentCode', params],
    (params) => studentService.getStudentDetailAndGradeByStudentCode(params),
);
export const useGetStudentsByProgramIdQuery = createBaseQuery<
    GetStudentsByProgramIdResponse[],
    GetStudentsByProgramIdRequest
>(
    (params) => ['studentsByProgramId', params],
    (params) => studentService.getStudentsByProgramId(params),
);

