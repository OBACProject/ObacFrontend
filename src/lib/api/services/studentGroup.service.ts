import { STUDENT_GROUP_ENDPOINTS } from "../endpoints/studentGroup.endpoints";
import { GetAllStudentGroupByTermYearRequest, GetStudentGroupScheduleStatusRequest, UpdateStudentGroupByStudentGroupIdRequest } from "../models/studentGroup/studentGroup.request";
import { GetAllStudentGroupByTermYearResponse, GetStudentGroupByGroupIdResponse, GetStudentGroupScheduleStatusResponse } from "../models/studentGroup/studentGroup.response";
import { BaseService } from "./base/base.service";




export class StudentGroupService extends BaseService {
    async getStudentGroupByGroupId(groupId: string): Promise<GetStudentGroupByGroupIdResponse> {
        const data = this.get<GetStudentGroupByGroupIdResponse>(`${STUDENT_GROUP_ENDPOINTS.GET_STUDENT_GROUP_BY_GROUP_ID}/${groupId}`);
        return this.get<GetStudentGroupByGroupIdResponse>(`${STUDENT_GROUP_ENDPOINTS.GET_STUDENT_GROUP_BY_GROUP_ID}?studentGroupId=${groupId}`);
    }
    async getAllStudentGroups(params : GetAllStudentGroupByTermYearRequest): Promise<GetAllStudentGroupByTermYearResponse[]> {
        const data = this.get<GetAllStudentGroupByTermYearResponse[]>(STUDENT_GROUP_ENDPOINTS.GET_ALL_STUDENT_GROUP_BY_TERM_YEAR, params);
        return this.get<GetAllStudentGroupByTermYearResponse[]>(STUDENT_GROUP_ENDPOINTS.GET_ALL_STUDENT_GROUP_BY_TERM_YEAR, params);
    }
    async getStudentGroupScheduleStatus(params : GetStudentGroupScheduleStatusRequest): Promise<GetStudentGroupScheduleStatusResponse[]> {
        const data = this.get<GetStudentGroupScheduleStatusResponse[]>(STUDENT_GROUP_ENDPOINTS.GET_STUDENT_GROUP_SCHEDULE_STATUS, params);
        return this.get<GetStudentGroupScheduleStatusResponse[]>(STUDENT_GROUP_ENDPOINTS.GET_STUDENT_GROUP_SCHEDULE_STATUS, params);
    }
    async updateStudentGroupByStudentGroupId(params : UpdateStudentGroupByStudentGroupIdRequest): Promise<void> {
        const data = this.put<void>(STUDENT_GROUP_ENDPOINTS.UPDATE_STUDENT_GROUP_BY_STUDENT_GROUP_ID, params);
        return this.put<void>(STUDENT_GROUP_ENDPOINTS.UPDATE_STUDENT_GROUP_BY_STUDENT_GROUP_ID, params);
    }
    async updatePublishStatusByStudentGroupId(studentGroupId: number, isPublished: boolean): Promise<void> {
        return this.put<void>(`${STUDENT_GROUP_ENDPOINTS.PUT_IS_PUBLISHED_BY_STUDENT_GROUP_ID}?studentGroupId=${studentGroupId}&publish=${isPublished}`, {});
    }
}


export const studentGroupService = new StudentGroupService();