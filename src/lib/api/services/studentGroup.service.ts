import { STUDENT_GROUP_ENDPOINTS } from "../endpoints/studentGroup.endpoints";
import { GetAllStudentGroupByTermYearRequest } from "../models/studentGroup/studentGroup.request";
import { GetAllStudentGroupByTermYearResponse } from "../models/studentGroup/studentGroup.response";
import { BaseService } from "./base/base.service";




export class StudentGroupService extends BaseService {
    async getAllStudentGroups(params : GetAllStudentGroupByTermYearRequest): Promise<GetAllStudentGroupByTermYearResponse[]> {
        return this.get<GetAllStudentGroupByTermYearResponse[]>(STUDENT_GROUP_ENDPOINTS.GET_ALL_STUDENT_GROUP_BY_TERM_YEAR, params);
    }
}


export const studentGroupService = new StudentGroupService();