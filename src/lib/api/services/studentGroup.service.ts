import { STUDENT_GROUP_ENDPOINTS } from "../endpoints/studentGroup.endpoints";
import { GetAllStudentGroupByTermYearRequest, GetStudentGroupScheduleStatusRequest, UpdateStudentGroupByStudentGroupIdRequest } from "../models/studentGroup/studentGroup.request";
import { GetAllStudentGroupByTermYearResponse, GetStudentGroupScheduleStatusResponse } from "../models/studentGroup/studentGroup.response";
import { BaseService } from "./base/base.service";




export class StudentGroupService extends BaseService {
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
        return this.get<void>(STUDENT_GROUP_ENDPOINTS.UPDATE_STUDENT_GROUP_BY_STUDENT_GROUP_ID, params);
    }
}


export const studentGroupService = new StudentGroupService();