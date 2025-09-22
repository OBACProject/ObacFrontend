import { DASHBOARD_ENDPOINTS } from "../endpoints/dashboard.endpoints";
import { DashboardGetGenderInfoCountRequest } from "../models/dashboard/dashboard.request";
import { DashboardGetGenderInfoCountResponse, DashboardGetStudentClassCountDtosResponse, DashboardGetStudentClassCountResponse } from "../models/dashboard/dashboard.response";
import { BaseService } from "./base/base.service";




export class DashboardService extends BaseService {
    async getGenderInfoCount(params: DashboardGetGenderInfoCountRequest): Promise<DashboardGetGenderInfoCountResponse[]> {
        return this.get<DashboardGetGenderInfoCountResponse[]>(DASHBOARD_ENDPOINTS.GET_GENDER_INFO_COUNT, params);
    }
    async getStudentClassCount(): Promise<DashboardGetStudentClassCountResponse[]> {
        return this.get<DashboardGetStudentClassCountResponse[]>(DASHBOARD_ENDPOINTS.GET_STUDENT_CLASS_COUNT);
    }

    async getStudentClassCountDtos(): Promise<DashboardGetStudentClassCountDtosResponse[]> {
        return this.get<DashboardGetStudentClassCountDtosResponse[]>(DASHBOARD_ENDPOINTS.GET_STUDENT_CLASS_COUNT_DTOS);
    }
}

export const dashboardService = new DashboardService();